import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { primaryKey } from "drizzle-orm/pg-core";
import { OrganizationTable } from "./organizations.schema";
import { UserTable } from "./users.schema";

export const DepartmentTable = pgTable("department", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  organization_id: uuid("organization_id")
    .references(() => OrganizationTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  manager_id: uuid("manager_id").references(() => UserTable.id, {
    onDelete: "set null",
  }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const DepartmentMemberTable = pgTable(
  "department_member",
  {
    department_id: uuid("department_id")
      .references(() => DepartmentTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    user_id: uuid("user_id")
      .references(() => UserTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.department_id, table.user_id] }),
  }),
);

export const DepartmentRelations = relations(
  DepartmentTable,
  ({ many, one }) => ({
    members: many(DepartmentMemberTable),
    manager: one(UserTable, {
      fields: [DepartmentTable.manager_id],
      references: [UserTable.id],
    }),
  }),
);

export const DepartmentMemberRelations = relations(
  DepartmentMemberTable,
  ({ one }) => ({
    department: one(DepartmentTable, {
      fields: [DepartmentMemberTable.department_id],
      references: [DepartmentTable.id],
    }),
    user: one(UserTable, {
      fields: [DepartmentMemberTable.user_id],
      references: [UserTable.id],
    }),
  }),
);
