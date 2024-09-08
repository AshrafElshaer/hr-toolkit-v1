"use server";
import OrganizationMutations from "@v1/supabase/organization-mutations";
import { organizationInsertSchema } from "@v1/supabase/validations";
import { authActionClient } from "../safe-action";

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
    const { user, supabase } = ctx;

    const newOrgId = await OrganizationMutations.create(user.id, parsedInput);

    await supabase.auth.updateUser({
      data: {
        organization_id: newOrgId,
      },
    });
    return newOrgId;
  });
