import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { AddressTable, db } from "../db";
import { safeAsync } from "../utils";
import { cacheKeys } from "./cache-keys";

export const getAddress = (userId: string) =>
  unstable_cache(
    async () => {
      return safeAsync(async () => {
        return db.query.AddressTable.findMany({
          where: eq(AddressTable.user_id, userId),
        });
      });
    },
    [cacheKeys.user.address, userId],
    { revalidate: 180, tags: [`${cacheKeys.user.address}-${userId}`] }, // Cache for 3 minutes
  )();
