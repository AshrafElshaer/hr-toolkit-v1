"use server";

import timeSheetMuatations from "@v1/supabase/timesheet-mutations";
import { authActionClient } from "../safe-action";
import { createTimeSheetSchema, updateTimeSheetSchema } from "./schema";

export const clockInAction = authActionClient
  .metadata({
    name: "clock-in",
    track: {
      event: "clock-in",
      channel: "timesheet",
    },
  })
  .action(async ({ ctx }) => {
    const { user } = ctx;
  });
