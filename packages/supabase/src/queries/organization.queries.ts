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
import { getOrganizationMembersQuery } from "../db/statements/employees.statements";
import { safeAsync } from "../utils";
import { cacheKeys } from "./cache-keys";

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
    [cacheKeys.organization.info, organizationId],
    {
      revalidate: 180,
      tags: [`${cacheKeys.organization.info}-${organizationId}`],
    },
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
    [cacheKeys.organization.members, organizationId],
    {
      revalidate: 180,
      tags: [`${cacheKeys.organization.members}-${organizationId}`],
    },
  )();
