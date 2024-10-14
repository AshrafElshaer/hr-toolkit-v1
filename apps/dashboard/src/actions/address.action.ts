"use server";

import addressMutations from "@toolkit/supabase/address-mutations";
import { cacheKeys } from "@toolkit/supabase/cache-keys";
import {
  addressInsertSchema,
  addressUpdateSchema,
} from "@toolkit/supabase/validations";
import { revalidatePath, revalidateTag } from "next/cache";
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
    revalidateTag(`${cacheKeys.user.address}-${payload.user_id}`);
    revalidateUrl && revalidatePath(revalidateUrl);
    return data;
  });

export const createAddressAction = authActionClient
  .metadata({
    name: "create-address",
    track: {
      event: "create-address",
      channel: "address",
    },
  })
  .schema(addressInsertSchema.extend({ revalidateUrl: z.string() }))
  .action(async ({ parsedInput }) => {
    const { revalidateUrl, ...payload } = parsedInput;
    const { data, error } = await addressMutations.create(payload);
    if (error) {
      throw new Error(error.message);
    }
    revalidateTag(`${cacheKeys.user.address}-${payload.user_id}`);
    revalidateUrl && revalidatePath(revalidateUrl);
    return data;
  });

export const deleteAddressAction = authActionClient
  .metadata({
    name: "delete-address",
    track: {
      event: "delete-address",
      channel: "address",
    },
  })
  .schema(z.object({ id: z.string(), revalidateUrl: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const { id, revalidateUrl } = parsedInput;
    const { data, error } = await addressMutations.delete(id);
    revalidateTag(`${cacheKeys.user.address}-${ctx.user.id}`);
    revalidateUrl && revalidatePath(revalidateUrl);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });
