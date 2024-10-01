import { eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import {
  DepartmentMemberTable,
  DepartmentTable,
  OrganizationMemberTable,
  OrganizationTable,
  UserTable,
  db,
} from "../db";
import { getOrganizationMembersQuery } from "../db/statements/employees";
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

        return query;
      });

      return result;
    },
    [organizationId],
    { revalidate: 180, tags: [`user-organization-${organizationId}`] },
  )();

export const getOrganizationMembers = async (organizationId: string) =>
  unstable_cache(
    async () => {
      const result = await safeAsync(async () => {
        return await getOrganizationMembersQuery.execute({
          organization_id: organizationId,
        });
      });
      return result;
    },
    [organizationId],
    { revalidate: 180, tags: [`organization-members-${organizationId}`] },
  )();
