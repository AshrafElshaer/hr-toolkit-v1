"use server";

import { calcWorkedTime } from "@/lib/date";

import { authActionClient } from "@/lib/safe-action";
import timeSheetMutations from "@toolkit/supabase/timesheet-mutations";
import { TimeSheetStatusEnum } from "@toolkit/supabase/types";
import {
  timeSheetBreakRowSchema,
  timeSheetRowSchema,
  timeSheetUpdateSchema,
} from "@toolkit/supabase/validations";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentBreaks } from "@toolkit/supabase/queries";
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

export const approveTimeSheetAction = authActionClient
  .metadata({
    name: "approve-time-sheet",
    track: {
      event: "approve-time-sheet",
      channel: "time-sheet",
    },
  })
  .schema(z.array(z.string().uuid()))
  .action(async ({ parsedInput, ctx }) => {
    const promises = parsedInput.map((id) =>
      timeSheetMutations.update(ctx.supabase, id, {
        status: TimeSheetStatusEnum.approved,
      }),
    );
    const results = await Promise.all(promises);

    const errors = results.filter((result) => result.error);
    if (errors.length > 0) {
      throw new Error(
        errors[0].error?.message ?? "Failed to approve time sheet",
      );
    }
    revalidatePath(`/employee/${results[0].data?.user_id}/attendance`);
  });

export const rejectTimeSheetAction = authActionClient
  .metadata({
    name: "reject-time-sheet",
    track: {
      event: "reject-time-sheet",
      channel: "time-sheet",
    },
  })
  .schema(z.object({ ids: z.array(z.string().uuid()), note: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    const { ids, note } = parsedInput;

    const promises = ids.map((id) =>
      timeSheetMutations.update(ctx.supabase, id, {
        status: TimeSheetStatusEnum.rejected,
        notes: note,
      }),
    );
    const results = await Promise.all(promises);

    const errors = results.filter((result) => result.error);
    if (errors.length > 0) {
      throw new Error(
        errors[0].error?.message ?? "Failed to reject time sheet",
      );
    }
    revalidatePath(`/employee/${results[0].data?.user_id}/attendance`);
  });

export const updateTimeSheetAction = authActionClient
  .metadata({
    name: "update-time-sheet",
    track: {
      event: "update-time-sheet",
      channel: "time-sheet",
    },
  })
  .schema(z.object({ timeSheet: timeSheetUpdateSchema }))
  .action(async ({ parsedInput, ctx }) => {
    const { timeSheet } = parsedInput;
    if (!timeSheet.id) {
      throw new Error("Time sheet id is required");
    }
    const { data: breaks } = await getCurrentBreaks(ctx.supabase, timeSheet.id);

    const workedTime = calcWorkedTime(
      moment(timeSheet.clock_in).toDate(),
      breaks ?? [],
      moment(timeSheet.clock_out).toDate(),
    );

    const { data, error } = await timeSheetMutations.update(
      ctx.supabase,
      timeSheet.id,
      {
        ...timeSheet,
        total_worked_minutes: workedTime.hours * 60 + workedTime.minutes,
      },
    );

    if (error) {
      throw new Error(error.message);
    }
    revalidatePath(`/employee/${timeSheet.user_id}/attendance`);
    return data;
  });
