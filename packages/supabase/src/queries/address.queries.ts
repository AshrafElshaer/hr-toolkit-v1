import { unstable_cache } from "next/cache";
import type { SupabaseInstance } from "../types";
import { cacheKeys } from "./cache-keys";

export const getAddress = (supabase: SupabaseInstance, userId: string) =>
  unstable_cache(
    async () => {
      return await supabase.from("addresses").select("*").eq("user_id", userId);
    },
    [cacheKeys.user.address, userId],
    { revalidate: 180, tags: [`${cacheKeys.user.address}-${userId}`] }, // Cache for 3 minutes
  )();
