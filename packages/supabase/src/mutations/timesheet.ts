import { eq } from "drizzle-orm";
import { TimeSheetTable, db } from "../db";
import type { InsertTimeSheet } from "../types";

export async function create(data: InsertTimeSheet) {
  const [newTimeSheet] = await db
    .insert(TimeSheetTable)
    .values(data)
    .returning({
      id: TimeSheetTable.id,
    });
  return newTimeSheet;
}

export async function update(timesheetId: string, data: InsertTimeSheet) {
  const [updatedTimeSheet] = await db
    .update(TimeSheetTable)
    .set(data)
    .where(eq(TimeSheetTable.id, timesheetId))
    .returning({
      id: TimeSheetTable.id,
    });
  return updatedTimeSheet;
}

export default {
  create,
  update,
};
