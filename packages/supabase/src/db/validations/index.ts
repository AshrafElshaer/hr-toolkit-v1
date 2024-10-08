import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";
import {
  AddressTable,
  DepartmentMemberTable,
  DepartmentTable,
  EmergencyContactTable,
  NotesTable,
  OrganizationMemberTable,
  OrganizationOwnerTable,
  OrganizationTable,
  TimeSheetBreakTable,
  TimeSheetTable,
  UserTable,
} from "../schema";
export const userSchema = createSelectSchema(UserTable, {
  working_days_per_week: z.array(z.string()),
  phone_number: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
  email: z.string().email(),
});
export const userInsertSchema = createInsertSchema(UserTable, {
  working_days_per_week: z.array(z.string()),
  phone_number: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
  email: z.string().email(),
});
export const userUpdateSchema = createInsertSchema(UserTable, {
  working_days_per_week: z.array(z.string()),
  phone_number: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
  email: z.string().email(),
}).partial();

export const organizationSchema = createSelectSchema(OrganizationTable);
export const organizationInsertSchema = createInsertSchema(OrganizationTable);
export const organizationUpdateSchema =
  createInsertSchema(OrganizationTable).partial();

export const organizationMemberSchema = createSelectSchema(
  OrganizationMemberTable,
);
export const organizationMemberInsertSchema = createInsertSchema(
  OrganizationMemberTable,
);
export const organizationMemberUpdateSchema = createInsertSchema(
  OrganizationMemberTable,
).partial();

export const organizationOwnerSchema = createSelectSchema(
  OrganizationOwnerTable,
);
export const organizationOwnerInsertSchema = createInsertSchema(
  OrganizationOwnerTable,
);
export const organizationOwnerUpdateSchema = createInsertSchema(
  OrganizationOwnerTable,
).partial();

export const addressSchema = createSelectSchema(AddressTable);
export const addressInsertSchema = createInsertSchema(AddressTable);
export const addressUpdateSchema = createInsertSchema(AddressTable).partial();

export const emergencyContactSchema = createSelectSchema(
  EmergencyContactTable,
  {
    contact_number: z.string().refine((value) => isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
    contact_email: z.string().email(),
  },
);
export const emergencyContactInsertSchema = createInsertSchema(
  EmergencyContactTable,
  {
    contact_number: z.string().refine((value) => isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
    contact_email: z.string().email(),
  },
);
export const emergencyContactUpdateSchema = createInsertSchema(
  EmergencyContactTable,
  {
    contact_number: z.string().refine((value) => isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
    contact_email: z.string().email(),
  },
).partial();

export const timeSheetSchema = createSelectSchema(TimeSheetTable);
export const timeSheetInsertSchema = createInsertSchema(TimeSheetTable);
export const timeSheetUpdateSchema =
  createInsertSchema(TimeSheetTable).partial();

export const timeSheetBreakSchema = createSelectSchema(TimeSheetBreakTable);
export const timeSheetBreakInsertSchema =
  createInsertSchema(TimeSheetBreakTable);
export const timeSheetBreakUpdateSchema =
  createInsertSchema(TimeSheetBreakTable).partial();

export const departmentSchema = createSelectSchema(DepartmentTable);
export const departmentInsertSchema = createInsertSchema(DepartmentTable);
export const departmentUpdateSchema =
  createInsertSchema(DepartmentTable).partial();

export const departmentMemberSchema = createSelectSchema(DepartmentMemberTable);
export const departmentMemberInsertSchema = createInsertSchema(
  DepartmentMemberTable,
);
export const departmentMemberUpdateSchema = createInsertSchema(
  DepartmentMemberTable,
).partial();

export const noteSchema = createSelectSchema(NotesTable);
export const noteInsertSchema = createInsertSchema(NotesTable).omit({
  user_id: true,
});
export const noteUpdateSchema = createInsertSchema(NotesTable).partial();

// FORMS VALIDATIONS
export const createEmployeeSchema = userInsertSchema
  .setKey("avatar_url", z.string().url())
  .merge(emergencyContactInsertSchema.omit({ user_id: true }))
  .merge(addressInsertSchema.omit({ user_id: true }))
  .merge(departmentMemberInsertSchema.omit({ user_id: true }));
