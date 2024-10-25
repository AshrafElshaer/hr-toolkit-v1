import { unstable_cache } from "next/cache";
import type { SupabaseInstance } from "../types";
import { cacheKeys } from "./cache-keys";

export const getDepartments = async (
  supabase: SupabaseInstance,
  organizationId: string,
  filter: {
    name?: string;
    sort?: string;
    perPage?: number;
    page?: number;
  },
) => {
  const query = supabase
    .from("department")
    .select(`
      *,
      manager:manager_id(*),
      members:department_member!department_id(user_id)
    `)
    .eq("organization_id", organizationId);

  if (filter.name) {
    query.filter("name", "ilike", `%${filter.name}%`);
  }

  if (filter.perPage && filter.page) {
    query.range(
      (filter.page - 1) * filter.perPage,
      filter.page * filter.perPage,
    );
  }

  return await query;
};

export const getUserDepartment = async (
  supabase: SupabaseInstance,
  userId: string,
) => {
  return unstable_cache(
    async () => {
      return await supabase
        .from("department_member")
        .select(`
          department:department(*)
        `)
        .eq("user_id", userId)
        .single();
    },
    [cacheKeys.user.department, userId],
    { revalidate: 180, tags: [`${cacheKeys.user.department}-${userId}`] },
  )();
};

export const getDepartmentById = async (
  supabase: SupabaseInstance,
  id: string,
) => {
  return unstable_cache(
    async () => {
      return await supabase
        .from("department")
        .select("*")
        .eq("id", id)
        .single();
    },
    [cacheKeys.department.info, id],
    { revalidate: 180, tags: [`${cacheKeys.department.info}-${id}`] },
  )();
};

export const getDepartmentMembers = async (
  supabase: SupabaseInstance,
  departmentId: string,
) => {
  return unstable_cache(
    async () => {
      return await supabase
        .from("department_member")
        .select(`
          user:user(*),
          department:department(*)
        `)
        .eq("department_id", departmentId);
    },
    [cacheKeys.department.members, departmentId],
    {
      revalidate: 180,
      tags: [`${cacheKeys.department.members}-${departmentId}`],
    },
  )();
};
