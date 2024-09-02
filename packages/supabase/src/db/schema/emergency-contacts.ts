
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
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone_number: text("phone_number").notNull(),
    relation: text("relation").notNull(),
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