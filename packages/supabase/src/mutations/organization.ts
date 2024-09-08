import { logger } from "@v1/logger";
import {
  DepartmentTable,
  OrganizationOwnerTable,
  OrganizationTable,
  db,
} from "../db";
import type { InsertOrganization } from "../types";

export async function create(ownerId: string, data: InsertOrganization) {
  try {
    const [newOrg] = await db.insert(OrganizationTable).values(data).returning({
      id: OrganizationTable.id,
    });
    if (!newOrg) {
      throw new Error("Failed to create organization");
    }

    try {
      await db.insert(OrganizationOwnerTable).values({
        organization_id: newOrg.id,
        user_id: ownerId,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error("Error assigning owner to organization:", error.message);
        throw new Error(error.message);
      }
      logger.error("Unknown error assigning owner to organization:", error);
      throw new Error("Failed to assign owner to organization");
    }

    try {
      await db.insert(DepartmentTable).values({
        name: "Exec",
        description: "Executives",
        organization_id: newOrg.id,
        manager_id: ownerId,
      });
    } catch (error) {
      if (error instanceof Error) {
        logger.error("Error creating default department:", error.message);
        throw new Error(error.message);
      }
      logger.error("Unknown error creating default department:", error);
      throw new Error("Failed to create default department");
    }

    return newOrg.id;
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error creating organization:", error.message);
      throw new Error(error.message);
    }
    logger.error("Unknown error creating organization:", error);
    throw new Error("Unknown error creating organization");
  }
}

export default {
  create,
};
