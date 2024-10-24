"use server";

import { calcWorkedTime } from "@/lib/date";

import { authActionClient } from "@/lib/safe-action";
import timeSheetMutations from "@toolkit/supabase/timesheet-mutations";
import { TimeSheetStatusEnum } from "@toolkit/supabase/types";
import {
  timeSheetBreakRowSchema,
  timeSheetRowSchema,
} from "@toolkit/supabase/validations";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const clockInAction = authActionClient
  .metadata({
    name: "clock-in",
    track: {
      event: "clock-in",
      channel: "time-sheet",
    },
  })
  .action(async ({ ctx }) => {
    const { user, supabase } = ctx;
    const now = moment();

    const { data, error } = await timeSheetMutations.create(supabase, {
      user_id: user.id,
      date: now.format("YYYY-MM-DD"),
      status: TimeSheetStatusEnum.clocked_in,
      clock_in: now.toDate().toISOString(),
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    return data;
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
  .action(async ({ parsedInput, ctx }) => {
    const now = moment();
    const { data, error } = await timeSheetMutations.takeBreak(ctx.supabase, {
      time_sheet_id: parsedInput.time_sheet_id,
      break_start: now.toDate().toISOString(),
    });

    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/");
    return data;
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
  .action(async ({ parsedInput, ctx }) => {
    const { data, error } = await timeSheetMutations.endBreak(
      ctx.supabase,
      parsedInput.time_sheet_id,
    );

    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/");
    return data;
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
      timeSheet: timeSheetRowSchema,
      breaks: z.array(timeSheetBreakRowSchema),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const now = moment();
    const { timeSheet, breaks } = parsedInput;

    const workedTime = calcWorkedTime(
      moment(timeSheet.clock_in).toDate(),
      breaks,
      now.toDate(),
    );
    const totalWorkedMinutes = workedTime.hours * 60 + workedTime.minutes;

    const { data, error } = await timeSheetMutations.update(
      ctx.supabase,
      timeSheet.id,
      {
        clock_out: now.utc().toString(),
        status: TimeSheetStatusEnum.clocked_out,
        total_worked_minutes: totalWorkedMinutes,
      },
    );

    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/");
    return data;
  });
