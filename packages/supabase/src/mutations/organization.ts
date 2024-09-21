import { logger } from "@v1/logger";
import {
  DepartmentMemberTable,
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

  const { data: execDepartment, error: departmentError } = await safeAsync(
    async () => {
      const [department] = await db
        .insert(DepartmentTable)
        .values({
          name: "Exec",
          description: "Executives",
          organization_id: newOrg.id,
          manager_id: ownerId,
        })
        .returning({
          id: DepartmentTable.id,
        });
      return department;
    },
  );

  if (departmentError || !execDepartment) {
    logger.error(
      "Error creating default department:",
      departmentError?.message,
    );
    throw new Error(
      departmentError?.message ?? "Unknown error creating department",
    );
  }

  const { error: departmentMemberError } = await safeAsync(async () => {
    await db.insert(DepartmentMemberTable).values({
      department_id: execDepartment.id,
      user_id: ownerId,
    });
  });

  if (departmentMemberError) {
    logger.error(
      "Error creating default department member:",
      departmentMemberError.message,
    );
    throw new Error(
      departmentMemberError.message ??
        "Unknown error creating department member",
    );
  }

  return newOrg;
}

export default {
  create,
};
