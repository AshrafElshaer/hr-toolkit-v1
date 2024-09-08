import { logger } from "@v1/logger";
import { and, eq, isNull } from "drizzle-orm";
import moment from "moment";
import { TimeSheetBreakTable, TimeSheetTable, db } from "../db";
import type {
  InsertTimeSheet,
  InsertTimeSheetBreak,
  UpdateTimeSheet,
} from "../types";
import { safeAsync } from "../utils";

export async function create(data: InsertTimeSheet) {
  return await safeAsync(async () => {
    const [newTimeSheet] = await db
      .insert(TimeSheetTable)
      .values(data)
      .returning();
    return newTimeSheet;
  });
}

export async function update(timeSheetId: string, data: UpdateTimeSheet) {
  return await safeAsync(async () => {
    const [updatedTimeSheet] = await db
      .update(TimeSheetTable)
      .set(data)
      .where(eq(TimeSheetTable.id, timeSheetId))
      .returning();
    return updatedTimeSheet;
  });
}

export async function takeBreak(data: InsertTimeSheetBreak) {
  return await safeAsync(async () => {
    const [newTimeSheetBreak] = await db
      .insert(TimeSheetBreakTable)
      .values(data)
      .returning({
        id: TimeSheetBreakTable.id,
      });
    return newTimeSheetBreak;
  });
}

export async function endBreak(timeSheetId: string) {
  return await safeAsync(async () => {
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
  });
}

export default {
  create,
  update,
  takeBreak,
  endBreak,
};
