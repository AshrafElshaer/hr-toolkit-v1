import { and, eq, isNull } from "drizzle-orm";
import moment from "moment";
import { TimeSheetBreakTable, TimeSheetTable, db } from "../db";
import type {
  InsertTimeSheet,
  InsertTimeSheetBreak,
  UpdateTimeSheet,
} from "../types";

export async function create(data: InsertTimeSheet) {
  const [newTimeSheet] = await db
    .insert(TimeSheetTable)
    .values(data)
    .returning();
  return newTimeSheet;
}

export async function update(timeSheetId: string, data: UpdateTimeSheet) {
  const [updatedTimeSheet] = await db
    .update(TimeSheetTable)
    .set(data)
    .where(eq(TimeSheetTable.id, timeSheetId))
    .returning();
  return updatedTimeSheet;
}

export async function takeBreak(data: InsertTimeSheetBreak) {
  const [newTimeSheetBreak] = await db
    .insert(TimeSheetBreakTable)
    .values(data)
    .returning({
      id: TimeSheetBreakTable.id,
    });
  return newTimeSheetBreak;
}

export async function endBreak(timeSheetId: string) {
  const [updatedTimeSheetBreak] = await db
    .update(TimeSheetBreakTable)
    .set({ break_end: moment().utc().toDate() })
    .where(
      and(
        eq(TimeSheetBreakTable.time_sheet_id, timeSheetId),
        isNull(TimeSheetBreakTable.break_end),
      ),
    )
    .returning({
      id: TimeSheetBreakTable.id,
    });

  return updatedTimeSheetBreak;
}

export default {
  create,
  update,
  takeBreak,
  endBreak,
};
