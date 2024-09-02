import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { UserTable } from "./users";

export const AddressTable = pgTable("addresses", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  user_id: uuid("user_id")
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(),
  address_1: text("address_1").notNull(),
  address_2: text("address_2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  zip_code: text("zip_code").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const addressRelations = relations(AddressTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AddressTable.user_id],
    references: [UserTable.id],
  }),
}));
