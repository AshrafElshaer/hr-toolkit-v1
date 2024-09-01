import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { index } from "drizzle-orm/pg-core";
import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull().unique(),
    email: text("email").notNull().unique(),
    first_name: text("first_name").notNull().default(""),
    last_name: text("last_name").notNull().default(""),
    avatar_url: text("avatar_url").notNull().default(""),
    phone_number: text("phone_number").notNull().default(""),
    date_of_birth: date("date_of_birth")
      .notNull()
      .default(sql`current_date - '18 years'::interval`),
    gender: text("gender").notNull().default(""),
    hire_date: date("hire_date").notNull().default(sql`current_date`),
    leave_date: date("leave_date"),
    job_title: text("job_title").notNull().default(""),
    role: text("role").$type<"admin" | "manager" | "staff" | "team_lead">(),
    employment_status: text("employment_status")
      .$type<"active" | "inactive" | "terminated">()
      .default("active"),
    employment_type: text("employment_type")
      .$type<"full_time" | "part_time" | "contract" | "internship">()
      .default("full_time"),
    work_hours_per_week: integer("work_hours_per_week").default(40),
    user_role: text("user_role")
      .$type<"admin" | "manager" | "staff" | "team_lead">()
      .default("staff"),
    salary_per_hour: integer("salary_per_hour").default(0),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  },
  (table) => {
    return {
      email_idx: index("email_idx").on(table.email),
    };
  }
);

export const userRelations = relations(users, ({ many }) => ({
  organizations: many(organization_members),
}));

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().notNull().unique(),
  owner_id: uuid("owner_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const organizationRelations = relations(
  organizations,
  ({ one, many }) => ({
    owner: one(users, {
      fields: [organizations.owner_id],
      references: [users.id],
    }),
    members: many(organization_members),
  }),
);

export const organization_members = pgTable("organization_members", {
  id: uuid("id").primaryKey().notNull().unique(),
  organization_id: uuid("organization_id")
    .references(() => organizations.id)
    .notNull(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
});

export const organizationMemberRelations = relations(
  organization_members,
  ({ one }) => ({
    user: one(users, {
      fields: [organization_members.user_id],
      references: [users.id],
    }),
    organization: one(organizations, {
      fields: [organization_members.organization_id],
      references: [organizations.id],
    }),
  }),
);
