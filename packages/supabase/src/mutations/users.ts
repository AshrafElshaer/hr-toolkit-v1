import { logger } from "@toolkit/logger";
import { UserTable, db } from "../db";
import type { InsertUser } from "../types";
import { safeAsync } from "../utils";

export async function create(data: InsertUser) {
  return await safeAsync(async () => {
    const [newUser] = await db.insert(UserTable).values(data).returning({
      id: UserTable.id,
    });
    return newUser;
  });
}

export default {
  create,
};
