import OrganizationMutations from "@v1/supabase/organization-mutations";
import { authActionClient } from "../safe-action";
import { createOrganizationSchema } from "./schema";

export const createOrganizationAction = authActionClient
  .schema(createOrganizationSchema)
  .metadata({
    name: "create-organization",
  })
  .action(async ({ ctx, parsedInput }) => {
    const { user } = ctx;

    const newOrg = await OrganizationMutations.create(user.id, parsedInput);
    return newOrg;
  });
