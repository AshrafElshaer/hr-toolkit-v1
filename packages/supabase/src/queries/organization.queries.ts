import { unstable_cache } from "next/cache";
import type {
  EmploymentStatusEnum,
  EmploymentTypeEnum,
  SupabaseInstance,
  UserRolesEnum,
} from "../types";

import { QueryData } from "@supabase/supabase-js";
import { cacheKeys } from "./cache-keys";

export const getOrganizationById = async (
  supabase: SupabaseInstance,
  organizationId: string,
) =>
  unstable_cache(
    async () => {
      return await supabase
        .from("organization")
        .select("*")
        .eq("id", organizationId)
        .single();
    },
    [cacheKeys.organization.info, organizationId],
    {
      revalidate: 180,
      tags: [`${cacheKeys.organization.info}-${organizationId}`],
    },
  )();

export const getOrganizationMembers = async (
  supabase: SupabaseInstance,
  organizationId: string,
  filters: {
    status?: string[];
    department?: string[];
    role?: string[];
    type?: string[];
    perPage?: number;
    page?: number;
    name?: string;
  },
) => {
  let query = supabase
    .from("organization_members")
    .select(`
    user:user(*),
    department:user(department_member(department(*)))
  `)
    .eq("organization_id", organizationId)
    .not("user", "is", null)
    .not("department", "is", null);

  if (filters.status?.length) {
    query = query.in("user.employment_status", filters.status);
  }
  if (filters.department?.length) {
    query = query.in(
      "department.department_member.department.id",
      filters.department,
    );
  }
  if (filters.role?.length) {
    query = query.in("user.role", filters.role);
  }
  if (filters.type?.length) {
    query = query.in("user.employment_type", filters.type);
  }
  if (filters.perPage && filters.page) {
    query = query.range(
      filters.page * filters.perPage,
      (filters.page + 1) * filters.perPage,
    );
  }
  if (filters.name) {
    query = query.or(
      `first_name.ilike.%${filters.name}%,last_name.ilike.%${filters.name}%`,
      {
        referencedTable: "user",
      },
    );
  }

  const { data, error } = await query;

  return {
    data: data
      ?.filter((item) => item.department?.department_member[0]?.department)
      .map((item) => {
        return {
          ...item,
          department: item.department?.department_member[0]?.department,
        };
      }),
    error,
  };
};
