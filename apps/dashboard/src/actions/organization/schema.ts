import { nullable, z } from "zod";

export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(["for-profit", "non-profit", "government"]),
  logo_url: z.string().nullable(),
  time_zone: z.string(),
  website: z.string().nullable(),
  contact_name: z.string(),
  contact_email: z.string(),
  contact_number: z.string(),
  payroll_pattern: z.enum(["weekly", "bi-weekly", "monthly"]),
  payroll_start_day: z.number().int(),
  address_1: z.string(),
  address_2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip_code: z.string(),
});

export const createOrganizationSchema = organizationSchema.omit({
  id: true,
});

export const updateOrganizationSchema = organizationSchema.partial();
