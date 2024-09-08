import { logger } from "@v1/logger";
import { AddressTable, db } from "../db";
import type { InsertAddress } from "../types";

async function create(data: InsertAddress) {
  try {
    return await db.insert(AddressTable).values(data).returning();
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error creating address:", error.message);
      throw new Error(error.message);
    }
    logger.error("Unknown error creating address:", error);
    throw new Error("Unknown error creating address");
  }
}

export default {
  create,
};
