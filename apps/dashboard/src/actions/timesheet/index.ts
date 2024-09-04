"use server";

import timeSheetMutations from "@v1/supabase/timesheet-mutations";
import { authActionClient } from "../safe-action";
import { createTimeSheetSchema, updateTimeSheetSchema } from "./schema";

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
  });
