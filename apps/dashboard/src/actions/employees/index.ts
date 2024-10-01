"use server";

import { createServerClient } from "@/lib/supabase/server";
import OrganizationMutations from "@toolkit/supabase/organization-mutations";
import { createEmployeeSchema } from "@toolkit/supabase/validations";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { authActionClient } from "../safe-action";
import { revalidateTag } from "next/cache";

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
      employee: createEmployeeSchema.omit({ id: true, avatar_url: true }),
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
        role: employee.role,
        user_metadata: {
          organization_id: ctx.user.user_metadata.organization_id,
        },
      });

    if (authError || !auth.user) {
      throw new Error(authError?.message ?? "Unknown error creating user auth");
    }

    // let avatarUrl = "";
    // if (image.file) {
    //   console.log(image.file);
    //   const { data: avatar, error: avatarError } = await supabase.storage
    //     .from("avatars")
    //     .upload(
    //       `${ctx.user.user_metadata.organization_id}/${auth.user.id}`,
    //       image.file,
    //     );

    //   if (avatarError) {
    //     throw new Error(avatarError.message);
    //   }

    //   const { data: url } = supabase.storage
    //     .from("avatars")
    //     .getPublicUrl(avatar.path);

    //   avatarUrl = url.publicUrl;
    // }

    const { data, error } = await OrganizationMutations.createEmployee(
      { ...employee, id: auth.user.id, avatar_url: "" },
      ctx.user.user_metadata.organization_id,
    );

    if (error) {
      throw new Error(error.message);
    }
    revalidateTag(`organization-members-${ctx.user.user_metadata.organization_id}`);
    redirect("/employees");
    return {
      user: auth.user,
    };
  });
