import { and, eq } from "drizzle-orm";
import { TimeSheetBreakTable, TimeSheetTable, db } from "../db";
import { TimeSheetStatusEnum } from "../types";

export async function getCurrentTimeSheet(userId: string) {
  const timeSheet = await db.query.TimeSheetTable.findFirst({
    where: and(
      eq(TimeSheetTable.user_id, userId),
      eq(TimeSheetTable.status, TimeSheetStatusEnum.clocked_in),
    ),
  });
  return timeSheet;
}

export async function getCurrentBreaks(time_sheet_id?: string) {
  if (!time_sheet_id) return undefined;

  const currentBreak = await db.query.TimeSheetBreakTable.findMany({
    where: eq(TimeSheetBreakTable.time_sheet_id, time_sheet_id),
  });
  return currentBreak;
}
