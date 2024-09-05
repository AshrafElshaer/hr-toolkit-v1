"use server";

import { calcWorkedTime } from "@/lib/date";
import { getCurrentBreaks, getCurrentTimeSheet } from "@v1/supabase/queries";
import timeSheetMutations from "@v1/supabase/timesheet-mutations";
import { TimeSheetStatusEnum } from "@v1/supabase/types";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authActionClient } from "../safe-action";
import { timeSheetBreakSchema, timeSheetSchema } from "./schema";

export const clockInAction = authActionClient
  .metadata({
    name: "clock-in",
    track: {
      event: "clock-in",
      channel: "time-sheet",
    },
  })
  .action(async ({ ctx }) => {
    const { user } = ctx;
    const now = moment();
    const timeSheet = await timeSheetMutations.create({
      user_id: user.id,
      clock_in: now.utc().toDate(),
      date: now.format("YYYY-MM-DD"),
      status: TimeSheetStatusEnum.clocked_in,
    });

    if (!timeSheet.id) {
      throw new Error("Failed to clock in");
    }

    revalidatePath("/");
    return timeSheet;
  });

export const takeBreakAction = authActionClient
  .metadata({
    name: "take-break",
    track: {
      event: "take-break",
      channel: "time-sheet",
    },
  })
  .schema(
    z.object({
      time_sheet_id: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const now = moment();
    const timeSheet = await timeSheetMutations.takeBreak({
      time_sheet_id: parsedInput.time_sheet_id,
      break_start: now.utc().toDate(),
    });

    if (!timeSheet.id) {
      throw new Error("Failed to take break");
    }
    revalidatePath("/");
  });

export const endBreakAction = authActionClient
  .metadata({
    name: "end-break",
    track: {
      event: "end-break",
      channel: "time-sheet",
    },
  })
  .schema(z.object({ time_sheet_id: z.string() }))
  .action(async ({ parsedInput }) => {
    console.log("endBreakAction", parsedInput);
    const timeSheet = await timeSheetMutations.endBreak(
      parsedInput.time_sheet_id,
    );

    if (!timeSheet.id) {
      throw new Error("Failed to end break");
    }
    revalidatePath("/");
  });

export const clockOutAction = authActionClient
  .metadata({
    name: "clock-out",
    track: {
      event: "clock-out",
      channel: "time-sheet",
    },
  })
  .schema(
    z.object({
      timeSheet: timeSheetSchema,
      breaks: z.array(timeSheetBreakSchema),
    }),
  )
  .action(async ({ parsedInput }) => {
    const now = moment();
    const { timeSheet, breaks } = parsedInput;

    const workedTime = calcWorkedTime(timeSheet.clock_in, breaks);
    const totalWorkedMinutes = workedTime.hours * 60 + workedTime.minutes;

    const updatedTimeSheet = await timeSheetMutations.update(
      parsedInput.timeSheet.id,
      {
        clock_out: now.utc().toDate(),
        status: TimeSheetStatusEnum.clocked_out,
        total_worked_minutes: totalWorkedMinutes,
      },
    );

    if (!updatedTimeSheet.id) {
      throw new Error("Failed to clock out");
    }
    revalidatePath("/");
    return updatedTimeSheet;
  });
