"use server";

import EmergencyContactMutations from "@toolkit/supabase/emergency-contacts-mutations";
import {
  emergencyContactsInsertSchema,
  emergencyContactsUpdateSchema,
} from "@toolkit/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authActionClient } from "./safe-action";

export const createEmergencyContactAction = authActionClient
  .metadata({
    name: "Create Emergency Contact",
    track: {
      event: "create_emergency_contact",
      channel: "emergency_contacts",
    },
  })
  .schema(emergencyContactsInsertSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { data, error } = await EmergencyContactMutations.create(
      ctx.supabase,
      parsedInput,
    );

    if (error) {
      return {
        error: error.message,
      };
    }
    revalidatePath(`/employees/${parsedInput.user_id}`);
    return data;
  });

export const updateEmergencyContactAction = authActionClient
  .metadata({
    name: "Update Emergency Contact",
    track: {
      event: "update_emergency_contact",
      channel: "emergency_contacts",
    },
  })
  .schema(emergencyContactsUpdateSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { data, error } = await EmergencyContactMutations.update(
      ctx.supabase,
      parsedInput,
    );

    if (error) {
      return {
        error: error.message,
      };
    }
    revalidatePath(`/employees/${parsedInput.user_id}`);
    return data;
  });

export const deleteEmergencyContactAction = authActionClient
  .metadata({
    name: "Delete Emergency Contact",
    track: {
      event: "delete_emergency_contact",
      channel: "emergency_contacts",
    },
  })
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const { data, error } = await EmergencyContactMutations.delete(
      ctx.supabase,
      parsedInput.id,
    );

    if (error) {
      return {
        error: error.message,
      };
    }
    revalidatePath(`/employees/${data?.user_id}`);
    return data;
  });
