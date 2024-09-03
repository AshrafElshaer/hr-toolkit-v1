import { relations, sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core";
import { UserTable } from "./users";

export const OrganizationTable = pgTable("organization", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  type: text("type")
    .$type<"for-profit" | "non-profit" | "government">()
    .notNull(),
  logo_url: text("logo_url").default(""),
  time_zone: text("time_zone").notNull(),
  website: text("website").default(""),
  contact_name: text("contact_name").notNull(),
  contact_email: text("contact_email").notNull(),
  contact_number: text("contact_number").notNull(),
  payroll_pattern: text("payroll_pattern")
    .$type<"weekly" | "bi-weekly" | "monthly">()
    .notNull(),
  payroll_start_day: integer("payroll_start_day").notNull(),
  address_1: text("address_1").notNull(),
  address_2: text("address_2").default(""),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  zip_code: text("zip_code").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const OrganizationTableRelations = relations(
  OrganizationTable,
  ({ one, many }) => ({
    members: many(OrganizationMemberTable),
    owner: one(OrganizationOwnerTable, {
      fields: [OrganizationTable.id],
      references: [OrganizationOwnerTable.organization_id],
    }),
  }),
);

export const OrganizationOwnerTable = pgTable(
  "organization_owners",
  {
    organization_id: uuid("organization_id")
      .references(() => OrganizationTable.id, { onDelete: "cascade" })
      .notNull(),
    user_id: uuid("user_id")
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.organization_id, table.user_id] }),
    };
  },
);

export const OrganizationMemberTable = pgTable(
  "organization_members",
  {
    organization_id: uuid("organization_id")
      .references(() => OrganizationTable.id, { onDelete: "cascade" })
      .notNull(),
    user_id: uuid("user_id")
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.organization_id, table.user_id] }),
    };
  },
);