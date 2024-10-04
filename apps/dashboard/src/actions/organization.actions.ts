"use server";
import { createServerClient } from "@/lib/supabase/server";
import OrganizationMutations from "@toolkit/supabase/organization-mutations";
import { organizationInsertSchema } from "@toolkit/supabase/validations";
import { authActionClient } from "./safe-action";

export const createOrganizationAction = authActionClient
  .schema(organizationInsertSchema)
  .metadata({
    name: "create-organization",
    track: {
      event: "create-organization",
      channel: "organization",
    },
  })
  .action(async ({ ctx, parsedInput }) => {
    const { user } = ctx;
    const supabase = createServerClient({
      isAdmin: true,
    });

    const newOrgId = await OrganizationMutations.create(user.id, parsedInput);

    await supabase.auth.admin.updateUserById(user.id, {
      role: "admin",
      user_metadata: {
        organization_id: newOrgId.id,
      },
    });

    return newOrgId;
  });
