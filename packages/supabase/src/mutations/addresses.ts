
import { AddressTable, db } from "../db";
import type { InsertAddress } from "../types";
import { safeAsync } from "../utils";

async function create(data: InsertAddress) {
  return await safeAsync(async () => {
    const [newAddress] = await db.insert(AddressTable).values(data).returning();
    return newAddress;
  });
}

export default {
  create,
};
