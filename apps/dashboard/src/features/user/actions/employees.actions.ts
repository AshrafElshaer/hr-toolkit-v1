"use server";

import { resend } from "@/lib/resend";
import { createServerClient } from "@/lib/supabase/server";
import { NewEmployeeEmail } from "@toolkit/email/new-employee";
import { cacheKeys } from "@toolkit/supabase/cache-keys";
import departmentMembersMutations from "@toolkit/supabase/department-member-mutations";
import OrganizationMutations from "@toolkit/supabase/organization-mutations";
import {
  getDepartmentMembers,
  getManagers,
  getOrganizationMembers,
  getUserDepartment,
} from "@toolkit/supabase/queries";
import {
  EmploymentStatusEnum,
  EmploymentTypeEnum,
  UserRolesEnum,
} from "@toolkit/supabase/types";
import userMutations from "@toolkit/supabase/user-mutations";
import {
  departmentMemberUpdateSchema,
  employeeInsertSchema,
  userUpdateSchema,
} from "@toolkit/supabase/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { authActionClient } from "@/lib/safe-action";

export const createEmployeeAction = authActionClient
  .metadata({
    name: "create-employee",
    track: {
      event: "create-employee",
      channel: "employees",
    },
  })
  .schema(
    z.object({
      employee: employeeInsertSchema.omit({
        id: true,
        avatar_url: true,
        user_id: true,
        organization_id: true,
      }),
    }),
  )
  .action(async ({ ctx, parsedInput }) => {
    const supabase = createServerClient({
      isAdmin: true,
    });

    const { employee } = parsedInput;
    const { data: auth, error: authError } =
      await supabase.auth.admin.createUser({
        email: employee.email,
        email_confirm: true,
        user_metadata: {
          organization_id: ctx.user.user_metadata.organization_id,
          role: employee.role,
        },
      });

    if (authError || !auth.user) {
      throw new Error(authError?.message ?? "Unknown error creating user auth");
    }

    const { data, error } = await OrganizationMutations.createEmployee(
      supabase,
      {
        ...employee,
        id: auth.user.id,
        avatar_url: "",
        user_id: "",
        organization_id: "",
      },
      ctx.user.user_metadata.organization_id,
    );

    if (error || !data) {
      throw new Error(error?.message ?? "Unknown error creating employee");
    }
    revalidateTag(
      `${cacheKeys.organization.members}-${ctx.user.user_metadata.organization_id}`,
    );

    await resend.emails.send({
      from: "HR Toolkit Onboarding<onboarding@hrtoolkit.app>",
      to: data.email,
      subject: "Welcome to HR Toolkit",
      react: NewEmployeeEmail({
        name: `${data.first_name} ${data.last_name}`,
        // organizationName: ctx.user.user_metadata.organization_name,
      }),
    });
    return {
      user: auth.user,
    };
  });

export const getEmployeesAction = authActionClient
  .metadata({
    name: "get-employees",
  })
  .schema(
    z.object({
      status: z.array(z.string()).optional(),
      department: z.array(z.string()).optional(),
      role: z.array(z.string()).optional(),
      type: z.array(z.string()).optional(),
      name: z.string().optional(),
    }),
  )
  .action(async ({ ctx, parsedInput }) => {
    const { user, supabase } = ctx;

    if (user.user_metadata.role === UserRolesEnum.admin) {
      const { data: employees, error: employeesError } =
        await getOrganizationMembers(
          supabase,
          user.user_metadata.organization_id,
          {
            status: parsedInput.status ? parsedInput.status : undefined,
            department: parsedInput.department
              ? parsedInput.department
              : undefined,
            role: parsedInput.role ? parsedInput.role : undefined,
            type: parsedInput.type ? parsedInput.type : undefined,
            name: parsedInput.name ? parsedInput.name : undefined,
          },
        );

      if (employeesError) {
        throw new Error(employeesError.message);
      }

      return employees;
    }

    const { data, error: departmentError } = await getUserDepartment(
      supabase,
      user.id,
    );
    if (departmentError || !data.department) {
      throw new Error(departmentError?.message ?? "Error getting department");
    }

    const { data: employees, error: employeesError } =
      await getDepartmentMembers(supabase, data.department.id);
    if (employeesError) {
      throw new Error(employeesError.message);
    }

    return employees;
  });


export const getManagersAction = authActionClient
  .metadata({
    name: "get-managers",
    track: {
      event: "get-managers",
      channel: "employees",
    },
  })
  .action(async ({ ctx }) => {
    const { data, error } = await getManagers(
      ctx.supabase,
      ctx.user.user_metadata.organization_id,
    );

    if (error) {
      throw new Error(error.message);
    }
    return data;
  });

export const updateEmployeeAction = authActionClient
  .metadata({
    name: "update-employee",
    track: {
      event: "update-employee",
      channel: "employees",
    },
  })
  .schema(userUpdateSchema.merge(departmentMemberUpdateSchema))
  .action(async ({ ctx, parsedInput }) => {
    const { department_id, user_id, ...data } = parsedInput;
    const { supabase } = ctx;

    if (!user_id) {
      throw new Error("User ID is required");
    }

    const { error: userError } = await userMutations.update(supabase, {
      id: user_id,
      ...data,
    });

    if (userError) {
      throw new Error(userError.message);
    }

    if (department_id) {
      const { data: departmentMemberData, error: departmentMemberError } =
        await getUserDepartment(supabase, user_id);

      if (departmentMemberError || !departmentMemberData.department) {
        throw new Error(
          departmentMemberError?.message ?? "Error getting department",
        );
      }

      if (departmentMemberData.department.manager_id === user_id) {
        throw new Error(
          "You cannot change the manager of a department, assign a new manager first",
        );
      }

      const { error: updatedMemberError } =
        await departmentMembersMutations.update(supabase, user_id, {
          department_id,
        });

      if (updatedMemberError) {
        throw new Error(updatedMemberError.message);
      }
    }

    revalidatePath(`/employees/${user_id}`);
    revalidateTag(
      `${cacheKeys.organization.members}-${ctx.user.user_metadata.organization_id}`,
    );
    revalidateTag(
      `${cacheKeys.organization.departments}-${ctx.user.user_metadata.organization_id}`,
    );

    return { ...data, department_id };
  });
