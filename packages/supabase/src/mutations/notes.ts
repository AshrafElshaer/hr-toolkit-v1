import { NotesTable, db } from "../db";
import type { InsertNote } from "../types";
import { safeAsync } from "../utils";

async function create(data: InsertNote) {
  return await safeAsync(async () => {
    const [newNote] = await db.insert(NotesTable).values(data).returning();
    return newNote;
  });
}

export default {
  create,
};
