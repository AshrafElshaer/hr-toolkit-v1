import type { SupabaseClient } from "@supabase/supabase-js";
import { type AddressTable, type UserTable, db } from "../db";

export type User = typeof UserTable.$inferSelect;
export type InsertUser = typeof UserTable.$inferInsert;

type UserRoles = "admin" | "manager" | "staff" | "team_leader";

export const UserRolesEnum: {
  [key in UserRoles]: key;
} = {
  admin: "admin",
  manager: "manager",
  staff: "staff",
  team_leader: "team_leader",
};

export type Address = typeof AddressTable.$inferSelect;
export type InsertAddress = typeof AddressTable.$inferInsert;

type StorageListFunction = SupabaseClient["storage"]["from"];
type ListFunctionReturn = ReturnType<StorageListFunction>;
type StorageFilePromise = Awaited<ReturnType<ListFunctionReturn["list"]>>;
type StorageFileType = Pick<StorageFilePromise, "data">["data"];
export type StorageFile = NonNullable<StorageFileType>[number];
