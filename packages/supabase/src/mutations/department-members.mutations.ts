import { and, eq } from "drizzle-orm";
import { DepartmentMemberTable, db } from "../db";
import type { InsertDepartmentMember, UpdateDepartmentMember } from "../types";
import { safeAsync } from "../utils";

export async function create(input: InsertDepartmentMember) {
  return safeAsync(async () => {
    const [newDepartmentMember] = await db
      .insert(DepartmentMemberTable)
      .values(input)
      .returning();
    return newDepartmentMember;
  });
}

export async function update(userId: string, input: UpdateDepartmentMember) {
  return safeAsync(async () => {
    const [updatedDepartmentMember] = await db
      .update(DepartmentMemberTable)
      .set(input)
      .where(eq(DepartmentMemberTable.user_id, userId as string))
      .returning();

    return updatedDepartmentMember;
  });
}

export async function remove(input: {
  department_id: string;
  user_id: string;
}) {
  return safeAsync(async () => {
    await db
      .delete(DepartmentMemberTable)
      .where(
        and(
          eq(
            DepartmentMemberTable.department_id,
            input.department_id as string,
          ),
          eq(DepartmentMemberTable.user_id, input.user_id as string),
        ),
      );
  });
}

export default {
  create,
  update,
  delete: remove,
};
