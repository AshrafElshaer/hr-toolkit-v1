import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import {
  DepartmentMemberTable,
  DepartmentTable,
  OrganizationMemberTable,
  OrganizationTable,
  UserTable,
  db,
} from "../db";
import { safeAsync } from "../utils";

// export const getOrganizationMembers = async (organizationId: string) =>
//   unstable_cache(async () => {
//     const result = await safeAsync(async () => {
//       return await db.query.OrganizationMemberTable.findMany({
//         where: eq(OrganizationMemberTable.organization_id, organizationId),
//       });
//     });
//   });

export const getOrganizationById = async (organizationId: string) =>
  unstable_cache(
    async () => {
      const result = await safeAsync(async () => {
        const query = await db.query.OrganizationTable.findFirst({
          where: eq(OrganizationTable.id, organizationId),
        });
        console.log({ query });
        return query;
      });
      console.log({ result });
      return result;
    },
    [organizationId],
    { revalidate: 180, tags: [`user-organization-${organizationId}`] },
  )();

export const getOrganizationMembers = async (organizationId: string) =>
  unstable_cache(
    async () => {
      const result = await safeAsync(async () => {
        return await db
          .select()
          .from(OrganizationMemberTable)
          .where(eq(OrganizationMemberTable.organization_id, organizationId))
          .leftJoin(
            UserTable,
            eq(OrganizationMemberTable.user_id, UserTable.id),
          )
          .leftJoin(
            DepartmentMemberTable,
            eq(UserTable.id, DepartmentMemberTable.user_id),
          )
          .leftJoin(
            DepartmentTable,
            eq(DepartmentMemberTable.department_id, DepartmentTable.id),
          );
      });
      return result;
    },
    [organizationId],
    { revalidate: 180, tags: [`organization-members-${organizationId}`] },
  )();
