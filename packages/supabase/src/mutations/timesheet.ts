import { logger } from "@v1/logger";
import { and, eq, isNull } from "drizzle-orm";
import moment from "moment";
import { TimeSheetBreakTable, TimeSheetTable, db } from "../db";
import type {
  InsertTimeSheet,
  InsertTimeSheetBreak,
  UpdateTimeSheet,
} from "../types";

export async function create(data: InsertTimeSheet) {
  try {
    const [newTimeSheet] = await db
      .insert(TimeSheetTable)
      .values(data)
      .returning();
    return newTimeSheet;
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error creating time sheet:", error.message);
      throw new Error(error.message);
    }
    logger.error("Unknown error creating time sheet:", error);
    throw new Error("Unknown error creating time sheet");
  }
}

export async function update(timeSheetId: string, data: UpdateTimeSheet) {
  try {
    const [updatedTimeSheet] = await db
      .update(TimeSheetTable)
      .set(data)
      .where(eq(TimeSheetTable.id, timeSheetId))
      .returning();
    return updatedTimeSheet;
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error updating time sheet:", error.message);
      throw new Error(error.message);
    }
    logger.error("Unknown error updating time sheet:", error);
    throw new Error("Unknown error updating time sheet");
  }
}

export async function takeBreak(data: InsertTimeSheetBreak) {
  try {
    const [newTimeSheetBreak] = await db
      .insert(TimeSheetBreakTable)
      .values(data)
      .returning({
        id: TimeSheetBreakTable.id,
      });
    return newTimeSheetBreak;
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error taking break:", error.message);
      throw new Error(error.message);
    }
    logger.error("Unknown error taking break:", error);
    throw new Error("Unknown error taking break");
  }
}

export async function endBreak(timeSheetId: string) {
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error ending break:", error.message);
      throw new Error(error.message);
    }
    logger.error("Unknown error ending break:", error);
    throw new Error("Unknown error ending break");
  }
}

export default {
  create,
  update,
  takeBreak,
  endBreak,
};
