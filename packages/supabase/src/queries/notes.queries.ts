import { unstable_cache } from "next/cache";
import type { SupabaseInstance } from "../types";
import { cacheKeys } from "./cache-keys";

export const getUserNotes = async (
  supabase: SupabaseInstance,
  userId: string,
) =>
  unstable_cache(
    async () => {
      return await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId)
        .order("createdAt", { ascending: false });
    },
    [cacheKeys.user.notes, userId],
    { revalidate: 180, tags: [`${cacheKeys.user.notes}-${userId}`] }, // Cache for 3 minutes, adjust as needed
  )();
