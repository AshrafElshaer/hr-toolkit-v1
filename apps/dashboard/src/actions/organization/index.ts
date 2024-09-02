import OrganizationMutations from "@v1/supabase/organization-mutations";
import { authActionClient } from "../safe-action";
import { createOrganizationSchema } from "./schema";

export const createOrganizationAction = authActionClient
  .schema(createOrganizationSchema)
  .metadata({
    name: "create-organization",
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
