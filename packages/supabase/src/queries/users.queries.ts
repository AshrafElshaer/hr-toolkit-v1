import type { SupabaseClient } from "@supabase/supabase-js";
import { and, eq, or } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import {
  DepartmentMemberTable,
  DepartmentTable,
  OrganizationMemberTable,
  OrganizationOwnerTable,
  UserTable,
  db,
} from "../db";
import { UserRolesEnum } from "../types";
import { safeAsync } from "../utils";
import { cacheKeys } from "./cache-keys";

export async function getCurrentUser(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, data.user.id),
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return user;
}

export const getUserById = async (id: string) => {
  const result = await safeAsync(async () => {
    return await db.query.UserTable.findFirst({
      where: eq(UserTable.id, id),
    });
  });
  return result;
};

export function getEmployees(orgId: string, deptId?: string) {
  return unstable_cache(
    async () => {
      const { data, error } = await safeAsync(async () => {
        if (deptId) {
          return await db
            .select()
            .from(DepartmentMemberTable)
            .where(eq(DepartmentMemberTable.department_id, deptId))
            .innerJoin(
              UserTable,
              eq(DepartmentMemberTable.user_id, UserTable.id),
            );
        }

        return await db
          .select({
            user: UserTable,
            department: DepartmentTable,
          })
          .from(OrganizationMemberTable)
          .where(eq(OrganizationMemberTable.organization_id, orgId))
          .innerJoin(
            UserTable,
            eq(OrganizationMemberTable.user_id, UserTable.id),
          )
          .leftJoin(
            DepartmentMemberTable,
            eq(DepartmentMemberTable.user_id, UserTable.id),
          )
          .leftJoin(
            DepartmentTable,
            eq(DepartmentMemberTable.department_id, DepartmentTable.id),
          );
      });
      if (error) {
        throw new Error(error.message);
      }
      return data;
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

export function getManagers(organizationId: string) {
  return unstable_cache(
    async () => {
      return await safeAsync(async () => {
        const result = await db
          .select({
            user: UserTable,
          })
          .from(UserTable)
          .leftJoin(
            OrganizationMemberTable,
            eq(OrganizationMemberTable.user_id, UserTable.id),
          )
          .leftJoin(
            OrganizationOwnerTable,
            eq(OrganizationOwnerTable.user_id, UserTable.id),
          )
          .where(
            and(
              or(
                eq(OrganizationMemberTable.organization_id, organizationId),
                eq(OrganizationOwnerTable.organization_id, organizationId),
              ),
              or(
                eq(UserTable.role, UserRolesEnum.manager),
                eq(UserTable.role, UserRolesEnum.admin),
                eq(OrganizationOwnerTable.organization_id, organizationId),
              ),
            ),
          );

        return result;
      });
    },
    [organizationId],
    {
      revalidate: 180,
      tags: [cacheKeys.organization.managers],
    },
  )();
}
