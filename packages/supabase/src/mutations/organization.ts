import {
  DepartmentTable,
  OrganizationOwnerTable,
  OrganizationTable,
  db,
} from "../db";
import type { InsertOrganization } from "../types";

export async function create(ownerId: string, data: InsertOrganization) {
  const [newOrg] = await db.insert(OrganizationTable).values(data).returning({
    id: OrganizationTable.id,
  });
  if (!newOrg) {
    throw new Error("Failed to create organization");
  }
  await db.insert(OrganizationOwnerTable).values({
    organization_id: newOrg.id,
    user_id: ownerId,
  });

  await db.insert(DepartmentTable).values({
    name: "Exec",
    description: "Executives",
    organization_id: newOrg.id,
    manager_id: ownerId,
  });

  return newOrg.id;
}

export default {
  create,
};
