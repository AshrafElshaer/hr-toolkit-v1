"use server";
import notesMutations from "@toolkit/supabase/note-mutations";
import { getUserNotes } from "@toolkit/supabase/queries";
import {
  noteInsertSchema,
  noteUpdateSchema,
} from "@toolkit/supabase/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
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

export const updateNoteAction = authActionClient
  .metadata({
    name: "update-note",
    track: {
      event: "update-note",
      channel: "notes",
    },
  })
  .schema(noteUpdateSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    const { data: note, error } = await notesMutations.update(data);
    if (error) {
      throw new Error(error.message);
    }
    revalidateTag(`user-notes-${ctx.user.id}`);

    return note;
  });

export const deleteNoteAction = authActionClient
  .metadata({
    name: "delete-note",
    track: {
      event: "delete-note",
      channel: "notes",
    },
  })
  .schema(z.object({ noteId: z.string() }))
  .action(async ({ parsedInput: { noteId }, ctx }) => {
    const { data: note, error } = await notesMutations.delete(noteId);
    if (error) {
      throw new Error(error.message);
    }
    revalidateTag(`user-notes-${ctx.user.id}`);

    return note;
  });
