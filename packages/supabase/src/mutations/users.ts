import { logger } from "@v1/logger";
import { UserTable, db } from "../db";
import type { InsertUser } from "../types";

export async function create(data: InsertUser) {
  try {
    return await db.insert(UserTable).values(data).returning({
      id: UserTable.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error creating user:", error.message);
      throw new Error(error.message);
    }
    logger.error("Unknown error creating user:", error);
    throw new Error("Unknown error creating user");
  }
}

export default {
  create,
};
