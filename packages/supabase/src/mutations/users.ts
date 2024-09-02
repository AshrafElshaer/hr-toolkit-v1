import { logger } from "@v1/logger";
import { UserTable, db } from "../db";
import type { InsertUser } from "../types";

export async function create(data: InsertUser) {
  return await db.insert(UserTable).values(data).returning({
    id: UserTable.id,
  });
}

export default {
  create,
};
