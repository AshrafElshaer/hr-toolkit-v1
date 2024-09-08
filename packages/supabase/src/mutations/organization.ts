import { logger } from "@v1/logger";
import {
  DepartmentTable,
  OrganizationOwnerTable,
  OrganizationTable,
  db,
} from "../db";
import type { InsertOrganization } from "../types";
import { safeAsync } from "../utils";

export async function create(ownerId: string, data: InsertOrganization) {
  const { data: newOrg, error: newOrgError } = await safeAsync(async () => {
    const [newOrg] = await db.insert(OrganizationTable).values(data).returning({
      id: OrganizationTable.id,
    });
    return newOrg;
  });

  if (!newOrg || newOrgError) {
    logger.error("Error creating organization:", newOrgError?.message);
    throw new Error(
      newOrgError?.message ?? "Unknown error creating organization",
    );
  }

  const { error: ownerError } = await safeAsync(async () => {
    await db.insert(OrganizationOwnerTable).values({
      organization_id: newOrg.id,
      user_id: ownerId,
    });
  });
  if (ownerError) {
    logger.error("Error assigning owner to organization:", ownerError.message);
    throw new Error(ownerError.message);
  }

  const { error: departmentError } = await safeAsync(async () => {
    await db.insert(DepartmentTable).values({
      name: "Exec",
      description: "Executives",
      organization_id: newOrg.id,
      manager_id: ownerId,
    });
  });
  if (departmentError) {
    logger.error("Error creating default department:", departmentError.message);
    throw new Error(departmentError.message);
  }

  return newOrg;
}

export default {
  create,
};
