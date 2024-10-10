import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { DepartmentMemberTable, DepartmentTable, UserTable, db } from "../db";
import { safeAsync } from "../utils";
import { cacheKeys } from "./cache-keys";

export const getDepartments = async (organizationId: string) => {
  return unstable_cache(
    async () => {
      const result = await safeAsync(async () => {
        return await db.query.DepartmentTable.findMany({
          where: eq(DepartmentTable.organization_id, organizationId),
          with: {
            manager: true,
            members: true,
          },
        });
      });
      return result;
    },
    [cacheKeys.organization.departments, organizationId],
    {
      revalidate: 180,
      tags: [`${cacheKeys.organization.departments}-${organizationId}`],
    },
  )();
};

export const getUserDepartment = async (userId: string) => {
  return unstable_cache(
    async () => {
      const result = await safeAsync(async () => {
        return await db.query.DepartmentMemberTable.findFirst({
          where: eq(DepartmentMemberTable.user_id, userId),
          with: {
            department: true,
          },
        });
      });
      return result;
    },
    [cacheKeys.user.department, userId],
    { revalidate: 180, tags: [`${cacheKeys.user.department}-${userId}`] },
  )();
};

export const getDepartmentById = async (id: string) => {
  return unstable_cache(
    async () => {
      const result = await safeAsync(async () => {
        return await db.query.DepartmentTable.findFirst({
          where: eq(DepartmentTable.id, id),
        });
      });
      return result;
    },
    [cacheKeys.department.info, id],
    { revalidate: 180, tags: [`${cacheKeys.department.info}-${id}`] },
  )();
};

export const getDepartmentMembers = async (departmentId: string) => {
  return unstable_cache(
    async () => {
      const result = await safeAsync(async () => {
        return await db
          .select({
            user: UserTable,
            department: DepartmentTable,
          })
          .from(UserTable)
          .innerJoin(
            DepartmentMemberTable,
            eq(DepartmentMemberTable.user_id, UserTable.id),
          )
          .innerJoin(
            DepartmentTable,
            eq(DepartmentTable.id, DepartmentMemberTable.department_id),
          )
          .where(eq(DepartmentMemberTable.department_id, departmentId));
      });

      return result;
    },
    [cacheKeys.department.members, departmentId],
    {
      revalidate: 180,
      tags: [`${cacheKeys.department.members}-${departmentId}`],
    },
  )();
};
