import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { NotesTable, db } from "../db";
import { safeAsync } from "../utils";
import { cacheKeys } from "./cache-keys";

export const getUserNotes = async (userId: string) =>
  unstable_cache(
    async () => {
      const result = await safeAsync(async () => {
        return await db
          .select()
          .from(NotesTable)
          .where(eq(NotesTable.user_id, userId))
          .orderBy(desc(NotesTable.createdAt));
      });
      return result;
    },
    [cacheKeys.user.notes, userId],
    { revalidate: 180, tags: [`${cacheKeys.user.notes}-${userId}`] }, // Cache for 3 minutes, adjust as needed
  )();
