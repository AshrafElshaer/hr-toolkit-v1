import { z } from "zod";

export const timeSheetSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  department_id: z.string().uuid(),
  clock_in: z.date(),
  clock_out: z.date().nullable(),
  break_start: z.date().nullable(),
  break_end: z.date().nullable(),
  date: z.date(),
  status: z
    .enum(["clocked_in", "clocked_out", "pending", "approved", "rejected"])
    .default("pending"),
  notes: z.string().nullable(),
  total_worked: z.number().default(0),
  created_at: z.date(),
  updated_at: z.date(),
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
