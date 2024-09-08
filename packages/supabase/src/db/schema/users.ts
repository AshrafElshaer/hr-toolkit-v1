import { relations, sql } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { AddressTable } from "./addresses";
import { EmergencyContactTable } from "./emergency-contacts";
import { OrganizationMemberTable } from "./organizations";
import { TimeSheetTable } from "./timesheet";

const UserRolesEnum = pgEnum("user_roles", [
  "admin",
  "manager",
  "staff",
  "team_lead",
]);
const EmploymentStatusEnum = pgEnum("employment_status", [
  "active",
  "inactive",
  "terminated",
]);
const EmploymentTypeEnum = pgEnum("employment_type", [
  "full_time",
  "part_time",
  "contract",
  "internship",
]);

export const UserTable = pgTable("user", {
  id: uuid("id").primaryKey().notNull(),
  email: text("email").notNull().unique(),
  first_name: text("first_name").notNull().default(""),
  last_name: text("last_name").notNull().default(""),
  avatar_url: text("avatar_url").default(""),
  phone_number: text("phone_number").default(""),
  date_of_birth: date("date_of_birth"),
  gender: text("gender").default(""),
  hire_date: date("hire_date").default(sql`current_date`),
  leave_date: date("leave_date"),
  job_title: text("job_title").default(""),
  role: UserRolesEnum("role").default("staff").notNull(),
  employment_status: EmploymentStatusEnum("employment_status")
    .default("active")
    .notNull(),
  employment_type: EmploymentTypeEnum("employment_type")
    .default("full_time")
    .notNull(),
  work_hours_per_week: integer("work_hours_per_week").default(40),
  salary_per_hour: integer("salary_per_hour").default(0),
  working_days_per_week: text("working_days_per_week").array().default([]),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const UserTableRelations = relations(UserTable, ({ many, one }) => ({
  organization: one(OrganizationMemberTable, {
    fields: [UserTable.id],
    references: [OrganizationMemberTable.user_id],
  }),
  emergency_contacts: many(EmergencyContactTable),
  addresses: many(AddressTable),
  timeSheets: many(TimeSheetTable),
}));
