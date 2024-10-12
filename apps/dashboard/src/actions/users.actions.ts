"use server";

import { authActionClient } from "@/actions/safe-action";
import addressMutations from "@toolkit/supabase/address-mutations";
import { cacheKeys } from "@toolkit/supabase/cache-keys";
import {
  getCurrentUser,
  getDepartmentMembers,
  getEmployees,
  getOrganizationMembers,
  getUserById,
  getUserDepartment,
} from "@toolkit/supabase/queries";
import { UserRolesEnum } from "@toolkit/supabase/types";
import userMutations from "@toolkit/supabase/user-mutations";
import {
  addressInsertSchema,
  userInsertSchema,
  userUpdateSchema,
} from "@toolkit/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createOrganizationOwnerSchema =
  userInsertSchema.merge(addressInsertSchema);

export const getCurrentUserAction = authActionClient
  .metadata({
    name: "get-current-user",
  })
  .action(async ({ ctx }) => {
    return await getCurrentUser(ctx.supabase);
  });

export const createOrganizationOwnerAction = authActionClient
  .schema(createOrganizationOwnerSchema)
  .metadata({
    name: "create-organization-owner",
    track: {
      event: "create-organization-owner",
      channel: "user",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { user } = ctx;

    const { data: newUser, error } = await userMutations.create({
      id: user.id,
      email: parsedInput.email,
      first_name: parsedInput.first_name,
      last_name: parsedInput.last_name,
      avatar_url: parsedInput.avatar_url,
      phone_number: parsedInput.phone_number,
      date_of_birth: parsedInput.date_of_birth,
      gender: parsedInput.gender,
      hire_date: parsedInput.hire_date,
      employment_status: parsedInput.employment_status,
      job_title: parsedInput.job_title,
      employment_type: parsedInput.employment_type,
      role: UserRolesEnum.admin,
      leave_date: parsedInput.leave_date ?? null,
      salary_per_hour: parsedInput.salary_per_hour,
      work_hours_per_week: parsedInput.work_hours_per_week,
      working_days_per_week: parsedInput.working_days_per_week,
    });

    if (error || !newUser) {
      throw new Error(error?.message ?? "Error creating user");
    }

    await addressMutations.create({
      address_1: parsedInput.address_1,
      address_2: parsedInput.address_2,
      city: parsedInput.city,
      state: parsedInput.state,
      zip_code: parsedInput.zip_code,
      country: parsedInput.country,
      user_id: newUser.id,
    });

    return {
      success: true,
    };
  });

export const updateUserByIdAction = authActionClient
  .metadata({
    name: "update-user-by-id",
  })
  .schema(userUpdateSchema.extend({ revalidateUrl: z.string().optional() }))
  .action(async ({ parsedInput }) => {
    const { revalidateUrl, ...payload } = parsedInput;
    const { data, error } = await userMutations.update(payload);
    if (error) {
      throw new Error(error.message);
    }
    revalidateUrl && revalidatePath(revalidateUrl);
    return data;
  });
