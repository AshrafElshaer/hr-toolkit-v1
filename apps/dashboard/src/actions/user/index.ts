"use server";

import { authActionClient } from "@/actions/safe-action";
import addressMutations from "@v1/supabase/address-mutations";
import { getCurrentUser } from "@v1/supabase/queries";
import { UserRolesEnum } from "@v1/supabase/types";
import userMutations from "@v1/supabase/user-mutations";
import { createAddressSchema, createUserSchema } from "./schema";

const createOrganizationOwnerSchema =
  createUserSchema.merge(createAddressSchema);

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
    const [newUser] = await userMutations.create({
      id: user.id,
      email: parsedInput.email,
      first_name: parsedInput.first_name,
      last_name: parsedInput.last_name,
      avatar_url: parsedInput.avatar_url,
      phone_number: parsedInput.phone_number,
      date_of_birth: parsedInput.date_of_birth.toISOString(),
      gender: parsedInput.gender,
      hire_date: parsedInput.hire_date.toISOString(),
      employment_status: parsedInput.employment_status,
      job_title: parsedInput.job_title,
      employment_type: parsedInput.employment_type,
      role: UserRolesEnum.admin,
      leave_date: parsedInput.leave_date?.toISOString() ?? null,
      salary_per_hour: parsedInput.salary_per_hour,
      work_hours_per_week: parsedInput.work_hours_per_week,
      working_days_per_week: parsedInput.working_days_per_week,
    });

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
