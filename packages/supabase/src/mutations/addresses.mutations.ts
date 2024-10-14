import { eq } from "drizzle-orm";
import { AddressTable, db } from "../db";
import type { InsertAddress, UpdateAddress } from "../types";
import { safeAsync } from "../utils";

async function create(data: InsertAddress) {
  return await safeAsync(async () => {
    const [newAddress] = await db.insert(AddressTable).values(data).returning();
    return newAddress;
  });
}

async function update(data: UpdateAddress) {
  return await safeAsync(async () => {
    const [updatedAddress] = await db
      .update(AddressTable)
      .set(data)
      .where(eq(AddressTable.id, data.id as string))
      .returning();
    return updatedAddress;
  });
}
async function remove(id: string) {
  return await safeAsync(async () => {
    await db.delete(AddressTable).where(eq(AddressTable.id, id));
  });
}
export default {
  create,
  update,
  delete: remove,
};
