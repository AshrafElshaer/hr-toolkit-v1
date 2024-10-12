"use server";

import addressMutations from "@toolkit/supabase/address-mutations";
import { addressUpdateSchema } from "@toolkit/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authActionClient } from "./safe-action";

export const updateAddressAction = authActionClient
  .metadata({
    name: "update-address",
    track: {
      event: "update-address",
      channel: "address",
    },
  })
  .schema(addressUpdateSchema.extend({ revalidateUrl: z.string().optional() }))
  .action(async ({ parsedInput }) => {
    const { revalidateUrl, ...payload } = parsedInput;
    const { data, error } = await addressMutations.update(payload);
    if (error) {
      throw new Error(error.message);
    }
    revalidateUrl && revalidatePath(revalidateUrl);
    return data;
  });
