"use server";
import { authActionClient } from "@/lib/safe-action";
import { cacheKeys } from "@toolkit/supabase/cache-keys";
import departmentMemberMutations from "@toolkit/supabase/department-member-mutations";
import departmentMutations from "@toolkit/supabase/department-mutations";
import {
  getDepartmentById,
  getDepartments,
  getUserById,
  getUserDepartment,
} from "@toolkit/supabase/queries";
import { UserRolesEnum } from "@toolkit/supabase/types";
import { departmentInsertSchema } from "@toolkit/supabase/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export const getDepartmentsAction = authActionClient
  .metadata({
    name: "get-departments",
  })
  .schema(
    z.object({
      name: z.string().optional(),
      sort: z.string().optional(),
      perPage: z.number().optional(),
      page: z.number().optional(),
    }),
  )
  .action(async ({ ctx: { user, supabase }, parsedInput }) => {
    const { data, error } = await getDepartments(
      supabase,
      user.user_metadata.organization_id,
      parsedInput,
    );
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });

export const createDepartmentAction = authActionClient
  .metadata({
    name: "create-department",
    track: {
      event: "create-department",
      channel: "departments",
    },
  })
  .schema(
    departmentInsertSchema.omit({
      organization_id: true,
    }),
  )
  .action(async ({ ctx: { user, supabase }, parsedInput }) => {
    // Create a new department
    const { data: newDepartment, error } = await departmentMutations.create(
      supabase,
      {
        ...parsedInput,
        organization_id: user.user_metadata.organization_id,
      },
    );
    if (error) {
      throw new Error(error.message);
    }
    if (!newDepartment) {
      throw new Error("Department not created");
    }

    // Get the manager details
    const { data: manager, error: managerError } = await getUserById(
      supabase,
      parsedInput.manager_id as string,
    );
    if (managerError) {
      throw new Error(managerError.message);
    }
    if (!manager) {
      throw new Error("Manager not found");
    }

    // If the manager is an admin, return the new department without further changes
    if (manager?.role === UserRolesEnum.admin) {
      return newDepartment;
    }

    // Get the manager's current department
    const { data: currentDepartment, error: currentDepartmentError } =
      await getUserDepartment(supabase, manager.id);

    if (currentDepartmentError) {
      throw new Error(currentDepartmentError.message);
    }

    // If the manager is currently in a department
    if (currentDepartment.department) {
      // If the manager is currently managing another department, remove them as manager
      if (currentDepartment.department?.manager_id === manager.id) {
        const { error: updatedDepartmentError } =
          await departmentMutations.update(supabase, {
            id: currentDepartment.department?.id,
            manager_id: null,
          });
        if (updatedDepartmentError) {
          throw new Error(updatedDepartmentError.message);
        }
      }
    }

    const { data: departmentMemberData, error: departmentMemberError } =
      await departmentMemberMutations.update(supabase, manager.id, {
        department_id: newDepartment.id,
      });

    if (departmentMemberError) {
      throw new Error(departmentMemberError.message);
    }

    revalidateTag(
      `${cacheKeys.organization.departments}-${user.user_metadata.organization_id}`,
    );
    revalidatePath("/departments");
    return departmentMemberData;
  });
