"use server";
import notesMutations from "@v1/supabase/note-mutations";
import { getUserNotes } from "@v1/supabase/queries";
import { noteInsertSchema } from "@v1/supabase/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";

export const getUserNotesAction = authActionClient
  .metadata({
    name: "get-user-notes",
  })
  .action(async ({ ctx }) => {
    const { data, error } = await getUserNotes(ctx.user.id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });

export const createNoteAction = authActionClient
  .metadata({
    name: "create-note",
    track: {
      event: "create-note",
      channel: "notes",
    },
  })
  .schema(noteInsertSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    const { data: note, error } = await notesMutations.create({
      ...data,
      user_id: ctx.user.id,
    });
    if (error) {
      throw new Error(error.message);
    }
    revalidateTag(`user-notes-${ctx.user.id}`);

    return note;
  });
