import type { getOrganizationMembersQuery } from "../db/statements/employees";

export type GetOrganizationMembersQuery = Awaited<
  ReturnType<typeof getOrganizationMembersQuery.execute>
>[number];
