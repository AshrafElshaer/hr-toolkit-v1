import type { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@toolkit/logger";
import type { z } from "zod";
import {
  AddressTable,
  DepartmentMemberTable,
  DepartmentTable,
  EmergencyContactTable,
  OrganizationMemberTable,
  OrganizationOwnerTable,
  OrganizationTable,
  UserTable,
  db,
} from "../db";
import type { createEmployeeSchema } from "../db/validations";
import type {
  Address,
  InsertAddress,
  InsertDepartmentMember,
  InsertEmergencyContact,
  InsertOrganization,
  InsertOrganizationMember,
  InsertUser,
  User,
} from "../types";
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

export async function createEmployee(
  data: z.infer<typeof createEmployeeSchema>,
  organizationId: string,
) {
  const user: InsertUser = {
    id: data.id as string,
    email: data.email as string,
    first_name: data.first_name ?? "",
    last_name: data.last_name ?? "",
    phone_number: data.phone_number ?? null,
    avatar_url: data.avatar_url ?? null,
    working_days_per_week: data.working_days_per_week ?? null,
    role: data.role,
    date_of_birth: data.date_of_birth ?? null,
    gender: data.gender ?? null,
    hire_date: data.hire_date ?? null,
    leave_date: data.leave_date ?? null,
    job_title: data.job_title ?? null,
    employment_status: data.employment_status ?? "active",
    employment_type: data.employment_type ?? "full_time",
    work_hours_per_week: data.work_hours_per_week ?? null,
    salary_per_hour: data.salary_per_hour ?? null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const address: InsertAddress = {
    address_1: data.address_1 ?? "",
    user_id: data.id as string,
    address_2: data.address_2 ?? "",
    city: data.city ?? "",
    state: data.state ?? "",
    zip_code: data.zip_code ?? "",
    country: data.country ?? "",
  };

  const emergencyContact: InsertEmergencyContact = {
    user_id: data.id as string,
    contact_name: data.contact_name ?? "",
    contact_email: data.contact_email ?? "",
    contact_number: data.contact_number ?? "",
    contact_relation: data.contact_relation ?? "",
  };

  const departmentMember: InsertDepartmentMember = {
    department_id: data.department_id ?? "",
    user_id: data.id as string,
  };

  const organizationMember: InsertOrganizationMember = {
    organization_id: organizationId,
    user_id: data.id as string,
  };

  const { data: employee, error: employeeError } = await safeAsync(async () => {
    return await db.transaction(async (tx) => {
      const [insertedUser] = await tx
        .insert(UserTable)
        .values(user)
        .returning();
      const [insertedAddress] = await tx
        .insert(AddressTable)
        .values(address)
        .returning();
      const [insertedEmergencyContact] = await tx
        .insert(EmergencyContactTable)
        .values(emergencyContact)
        .returning();
      const [insertedDepartmentMember] = await tx
        .insert(DepartmentMemberTable)
        .values(departmentMember)
        .returning();
      const [insertedOrganizationMember] = await tx
        .insert(OrganizationMemberTable)
        .values(organizationMember)
        .returning();

      if (
        !insertedUser ||
        !insertedAddress ||
        !insertedEmergencyContact ||
        !insertedDepartmentMember ||
        !insertedOrganizationMember
      ) {
        throw new Error("Failed to insert one or more records");
      }

      return {
        user: insertedUser,
        address: insertedAddress,
        emergencyContact: insertedEmergencyContact,
        departmentMember: insertedDepartmentMember,
        organizationMember: insertedOrganizationMember,
      };
    });
  });

  return {
    data: employee,
    error: employeeError,
  };
}

export default {
  create,
  createEmployee,
};
