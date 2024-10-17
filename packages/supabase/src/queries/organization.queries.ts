import { unstable_cache } from "next/cache";
import type { SupabaseInstance } from "../types";

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
) =>
  unstable_cache(
    async () => {
      const { data, error } = await supabase
        .from("organization_members")
        .select(`
          user:user(*),
          department:user(department_member(department(*)))
        `)
        .eq("organization_id", organizationId);

      return {
        data: data?.map((item) => {
          return {
            ...item,
            department: item.department?.department_member[0]?.department,
          };
        }),
        error,
      };
    },
    [cacheKeys.organization.members, organizationId],
    {
      revalidate: 180,
      tags: [`${cacheKeys.organization.members}-${organizationId}`],
    },
  )();
