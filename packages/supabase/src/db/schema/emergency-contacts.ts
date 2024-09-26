import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { UserTable } from "./users";

export const EmergencyContactTable = pgTable("emergency_contacts", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),

  user_id: uuid("user_id")
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(),
  contact_name: text("contact_name").notNull(),
  contact_email: text("contact_email").notNull(),
  contact_number: text("contact_number").notNull(),
  contact_relation: text("contact_relation").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const emergencyContactRelations = relations(
  EmergencyContactTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [EmergencyContactTable.user_id],
      references: [UserTable.id],
    }),
  }),
);
