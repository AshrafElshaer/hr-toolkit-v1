import type { InsertUser } from "@v1/supabase/types";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  avatar_url: z.string().nullable(),
  phone_number: z.string(),
  date_of_birth: z.date(),
  gender: z.enum(["male", "female"]),
  hire_date: z.date().default(() => new Date()),
  leave_date: z.date().nullable(),
  job_title: z.string(),
  role: z.enum(["admin", "manager", "staff", "team_lead"]).default("staff"),
  employment_status: z
    .enum(["active", "inactive", "terminated"])
    .default("active"),
  employment_type: z
    .enum(["full_time", "part_time", "contract", "internship"])
    .default("full_time"),
  work_hours_per_week: z.number().int().default(40),
  salary_per_hour: z.number().int().default(0),
  working_days_per_week: z.array(z.string()).default([]),
  created_at: z
    .date()
    .optional()
    .default(() => new Date()),
  updated_at: z
    .date()
    .optional()
    .default(() => new Date()),
});

export const createUserSchema = userSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateUserSchema = userSchema.partial();

export const addressSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  address_1: z.string(),
  address_2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip_code: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const createAddressSchema = addressSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
  updated_at: true,
});

export const updateAddressSchema = addressSchema.partial();

export const emergencyContactSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  relation: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const createEmergencyContactSchema = emergencyContactSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateEmergencyContactSchema = emergencyContactSchema.partial();
