import { relations, sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { real } from "drizzle-orm/pg-core";
import { UserTable } from "./users";

export const TimeSheetTable = pgTable("time_sheet", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  user_id: uuid("user_id")
    .references(() => UserTable.id)
    .notNull(),
  clock_in: timestamp("clock_in").defaultNow().notNull(),
  clock_out: timestamp("clock_out"),
  break_start: timestamp("break_start"),
  break_end: timestamp("break_end"),
  date: date("date").notNull(),
  status: text("status")
    .$type<"clocked_in" | "clocked_out" | "pending" | "approved" | "rejected">()
    .default("pending"),
  notes: text("notes"),
  total_worked: real("total_worked").default(0),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
