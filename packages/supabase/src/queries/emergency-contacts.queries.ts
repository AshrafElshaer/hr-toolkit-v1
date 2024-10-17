import { unstable_cache } from "next/cache";
import type { SupabaseInstance } from "../types";
import { cacheKeys } from "./cache-keys";

export const getEmergencyContacts = (
  supabase: SupabaseInstance,
  userId: string,
) =>
  unstable_cache(
    async () => {
      return await supabase
        .from("emergency_contacts")
        .select("*")
        .eq("user_id", userId);
    },
    [cacheKeys.user.emergency_contacts, userId],
    {
      revalidate: 180,
      tags: [`${cacheKeys.user.emergency_contacts}-${userId}`],
    }, // Cache for 3 minutes
  )();
