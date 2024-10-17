import { unstable_cache } from "next/cache";

import { type SupabaseInstance, UserRolesEnum } from "../types";
import { cacheKeys } from "./cache-keys";

export async function getCurrentUser(supabase: SupabaseInstance) {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return {
      data: null,
      error: new Error(error.message),
    };
  }

  return await supabase
    .from("user")
    .select("*")
    .eq("id", data.user.id)
    .single();
}

export const getUserById = async (supabase: SupabaseInstance, id: string) => {
  return await supabase.from("user").select("*").eq("id", id).single();
};

export function getEmployees(
  supabase: SupabaseInstance,
  orgId: string,
  deptId?: string,
) {
  return unstable_cache(
    async () => {
      if (deptId) {
        return await supabase
          .from("department_member")
          .select(`
            user:user(*)
          `)
          .eq("department_id", deptId);
      }

      return await supabase
        .from("organization_members")
        .select(`
        user:user(*),
        department:department_members!inner(
          department(*)
        )
      `)
        .eq("organization_id", orgId);
    },
    [orgId],
    {
      revalidate: 180,
      tags: [
        deptId ? cacheKeys.department.members : cacheKeys.organization.users,
      ],
    },
  );
}

export function getManagers(
  supabase: SupabaseInstance,
  organizationId: string,
) {
  return unstable_cache(
    async () => {
      const [managersResult, ownersResult] = await Promise.all([
        supabase
          .from("user")
          .select(`
            *,
            organization_members!inner(organization_id)
          `)
          .or("role.eq.admin,role.eq.manager")
          .eq("organization_members.organization_id", organizationId),
        supabase
          .from("user")
          .select(`
            *,
            organization_owners!inner(organization_id)
          `)
          .or("role.eq.admin,role.eq.manager")
          .eq("organization_owners.organization_id", organizationId),
      ]);

      const { data: managers, error: managersError } = managersResult;
      const { data: owners, error: ownersError } = ownersResult;
      return {
        data: [...(managers ?? []), ...(owners ?? [])],
        error: managersError || ownersError,
      };
    },
    [organizationId],
    {
      revalidate: 180,
      tags: [cacheKeys.organization.managers],
    },
  )();
}
