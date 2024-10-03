import { eq, sql } from "drizzle-orm";
import {
  DepartmentMemberTable,
  DepartmentTable,
  OrganizationMemberTable,
  UserTable,
  db,
} from "..";

export const getOrganizationMembersQuery = db
  .select({
    user: UserTable,
    department: DepartmentTable,
  })
  .from(OrganizationMemberTable)
  .where(
    eq(
      OrganizationMemberTable.organization_id,
      sql.placeholder("organization_id"),
    ),
  )
  .leftJoin(UserTable, eq(OrganizationMemberTable.user_id, UserTable.id))
  .leftJoin(
    DepartmentMemberTable,
    eq(UserTable.id, DepartmentMemberTable.user_id),
  )
  .leftJoin(
    DepartmentTable,
    eq(DepartmentMemberTable.department_id, DepartmentTable.id),
  )
  .prepare("getOrganizationMembersQuery");
