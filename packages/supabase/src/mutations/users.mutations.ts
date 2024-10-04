import { logger } from "@toolkit/logger";
import { eq } from "drizzle-orm";
import { UserTable, db } from "../db";
import type { InsertUser, UpdateUser } from "../types";
import { safeAsync } from "../utils";

export async function create(data: InsertUser) {
  return await safeAsync(async () => {
    const [newUser] = await db.insert(UserTable).values(data).returning({
      id: UserTable.id,
    });
    return newUser;
  });
}

export async function update(data: UpdateUser) {
  return await safeAsync(async () => {
    const [updatedUser] = await db
      .update(UserTable)
      .set(data)
      .where(eq(UserTable.id, data.id as string))
      .returning({
        id: UserTable.id,
      });
    return updatedUser;
  });
}

export default {
  create,
  update,
};
