import { relations, sql } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { real } from "drizzle-orm/pg-core";
import { UserTable } from "./users";

const TimeSheetStatusEnum = pgEnum("time_sheet_status", [
  "pending",
  "approved",
  "rejected",
  "clocked_in",
  "clocked_out",
]);

export const TimeSheetTable = pgTable("time_sheet", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  user_id: uuid("user_id")
    .references(() => UserTable.id)
    .notNull(),
  clock_in: timestamp("clock_in").defaultNow().notNull(),
  clock_out: timestamp("clock_out"),
  date: date("date").notNull(),
  status: TimeSheetStatusEnum("status").default("pending").notNull(),
  notes: text("notes"),
  total_worked_minutes: real("total_worked_minutes").default(0),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const TimeSheetBreakTable = pgTable("time_sheet_break", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  time_sheet_id: uuid("time_sheet_id")
    .references(() => TimeSheetTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  break_start: timestamp("break_start").notNull(),
  break_end: timestamp("break_end"),
});

export const TimeSheetTableRelations = relations(
  TimeSheetTable,
  ({ many }) => ({
    breaks: many(TimeSheetBreakTable),
  }),
);

export const TimeSheetBreakTableRelations = relations(
  TimeSheetBreakTable,
  ({ one }) => ({
    time_sheet: one(TimeSheetTable, {
      fields: [TimeSheetBreakTable.time_sheet_id],
      references: [TimeSheetTable.id],
    }),
  }),
);
