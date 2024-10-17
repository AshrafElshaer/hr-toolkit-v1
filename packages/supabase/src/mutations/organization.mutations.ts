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
import type { employeeInsertSchema } from "../db/validations";
import type {
  Address,
  InsertAddress,
  InsertDepartmentMember,
  InsertEmergencyContact,
  InsertOrganization,
  InsertOrganizationMember,
  InsertUser,
  SupabaseInstance,
  User,
} from "../types";

export async function create(
  supabase: SupabaseInstance,
  ownerId: string,
  data: InsertOrganization,
) {
  const { data: newOrg, error: newOrgError } = await supabase
    .from("organization")
    .insert(data)
    .select("id")
    .single();

  if (!newOrg || newOrgError) {
    logger.error("Error creating organization:", newOrgError?.message);
    throw new Error(
      newOrgError?.message ?? "Unknown error creating organization",
    );
  }

  const { error: ownerError } = await supabase
    .from("organization_owners")
    .insert({
      organization_id: newOrg.id,
      user_id: ownerId,
    });
  if (ownerError) {
    logger.error("Error assigning owner to organization:", ownerError.message);
    throw new Error(ownerError.message);
  }

  const { data: execDepartment, error: departmentError } = await supabase
    .from("department")
    .insert({
      name: "Exec",
      description: "Executives",
      organization_id: newOrg.id,
      manager_id: ownerId,
    })
    .select("id")
    .single();

  if (departmentError || !execDepartment) {
    logger.error(
      "Error creating default department:",
      departmentError?.message,
    );
    throw new Error(
      departmentError?.message ?? "Unknown error creating department",
    );
  }

  const { error: departmentMemberError } = await supabase
    .from("department_member")
    .insert({
      department_id: execDepartment.id,
      user_id: ownerId,
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
  supabase: SupabaseInstance,
  data: z.infer<typeof employeeInsertSchema>,
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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

  const [
    { data: newUser, error: newUserError },
    { data: newAddress, error: newAddressError },
    { data: newEmergencyContact, error: newEmergencyContactError },
    { data: newDepartmentMember, error: newDepartmentMemberError },
    { data: newOrganizationMember, error: newOrganizationMemberError },
  ] = await Promise.all([
    supabase.from("user").insert(user).select().single(),
    supabase.from("addresses").insert(address).select().single(),
    supabase
      .from("emergency_contacts")
      .insert(emergencyContact)
      .select()
      .single(),
    supabase
      .from("department_member")
      .insert(departmentMember)
      .select()
      .single(),
    supabase
      .from("organization_members")
      .insert(organizationMember)
      .select()
      .single(),
  ]);

  return {
    data: newUser,
    error:
      newUserError ||
      newAddressError ||
      newEmergencyContactError ||
      newDepartmentMemberError ||
      newOrganizationMemberError,
  };
}

export default {
  create,
  createEmployee,
};
