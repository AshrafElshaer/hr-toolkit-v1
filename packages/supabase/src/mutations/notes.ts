import { eq } from "drizzle-orm";
import { NotesTable, db } from "../db";
import type { InsertNote, UpdateNote } from "../types";
import { safeAsync } from "../utils";

async function create(data: InsertNote) {
  return await safeAsync(async () => {
    const [newNote] = await db.insert(NotesTable).values(data).returning();
    return newNote;
  });
}

async function update(data: UpdateNote) {
  if (!data.id) {
    throw new Error("Note ID is required");
  }
  return await safeAsync(async () => {
    const [updatedNote] = await db
      .update(NotesTable)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(NotesTable.id, data.id!))
      .returning();
    return updatedNote;
  });
}

async function remove(noteId: string) {
  return await safeAsync(async () => {
    await db.delete(NotesTable).where(eq(NotesTable.id, noteId));
  });
}

export default {
  create,
  update,
  delete: remove,
};
