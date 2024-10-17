import { relations } from "drizzle-orm";
import { json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./users.schema";

export const NotesTable = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => UserTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: text("title").notNull(),
  content: json("content").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});
export const notesRelations = relations(NotesTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [NotesTable.user_id],
    references: [UserTable.id],
  }),
}));
