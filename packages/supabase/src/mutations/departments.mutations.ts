import { eq } from "drizzle-orm";
import { DepartmentTable, db } from "../db";
import type { InsertDepartment, UpdateDepartment } from "../types";
import { safeAsync } from "../utils";

export async function create(input: InsertDepartment) {
  return safeAsync(async () => {
    const [newDepartment] = await db
      .insert(DepartmentTable)
      .values(input)
      .returning();
    return newDepartment;
  });
}

export async function update(input: UpdateDepartment) {
  return safeAsync(async () => {
    const [updatedDepartment] = await db
      .update(DepartmentTable)
      .set(input)
      .where(eq(DepartmentTable.id, input.id as string))
      .returning();
    return updatedDepartment;
  });
}

export async function remove(id: string) {
  return safeAsync(async () => {
    await db.delete(DepartmentTable).where(eq(DepartmentTable.id, id));
  });
}

export default {
  create,
  update,
  delete: remove,
};
