import { AddressTable, db } from "../db";
import type { InsertAddress } from "../types";

async function create(data: InsertAddress) {
  return await db.insert(AddressTable).values(data).returning();
}

export default {
  create,
};
