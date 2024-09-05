import { z } from "zod";

export const timeSheetSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  clock_in: z.date(),
  clock_out: z.date().nullable(),
  date: z.string(),
  status: z
    .enum(["clocked_in", "clocked_out", "pending", "approved", "rejected"])
    .default("pending")
    .nullable(),
  notes: z.string().nullable(),
  total_worked: z.number().default(0).nullable(),
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
});

export const createTimeSheetSchema = timeSheetSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateTimeSheetSchema = timeSheetSchema.omit({
  created_at: true,
  updated_at: true,
});

export const timeSheetBreakSchema = z.object({
  id: z.string().uuid(),
  time_sheet_id: z.string().uuid(),
  break_start: z.date(),
  break_end: z.date().nullable(),
});

export const createTimeSheetBreakSchema = timeSheetBreakSchema.omit({
  id: true,
});

export const updateTimeSheetBreakSchema = timeSheetBreakSchema.partial().omit({
  id: true,
  time_sheet_id: true,
});
