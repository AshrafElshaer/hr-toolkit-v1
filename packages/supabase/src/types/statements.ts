import type { getOrganizationMembersQuery } from "../db/statements/employees.statements";

export type GetOrganizationMembersQuery = Awaited<
  ReturnType<typeof getOrganizationMembersQuery.execute>
>[number];
