import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { EmergencyContactTable, db } from "../db";
import { safeAsync } from "../utils";
import { cacheKeys } from "./cache-keys";

export const getEmergencyContacts = (userId: string) =>
  unstable_cache(
    async () => {
      return safeAsync(async () => {
        return db.query.EmergencyContactTable.findFirst({
          where: eq(EmergencyContactTable.user_id, userId),
        });
      });
    },
    [cacheKeys.user.emergency_contacts, userId],
    {
      revalidate: 180,
      tags: [`${cacheKeys.user.emergency_contacts}-${userId}`],
    }, // Cache for 3 minutes
  )();
