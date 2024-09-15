import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  AddressTable,
  DepartmentMemberTable,
  DepartmentTable,
  NotesTable,
  OrganizationTable,
  TimeSheetBreakTable,
  TimeSheetTable,
  UserTable,
} from "../db";

export * from "./enums";

export type User = typeof UserTable.$inferSelect;
export type InsertUser = typeof UserTable.$inferInsert;
export type UpdateUser = Partial<InsertUser>;

export type Organization = typeof OrganizationTable.$inferSelect;
export type InsertOrganization = typeof OrganizationTable.$inferInsert;
export type UpdateOrganization = Partial<InsertOrganization>;

export type TimeSheet = typeof TimeSheetTable.$inferSelect;
export type InsertTimeSheet = typeof TimeSheetTable.$inferInsert;
export type UpdateTimeSheet = Partial<InsertTimeSheet>;

export type TimeSheetBreak = typeof TimeSheetBreakTable.$inferSelect;
export type InsertTimeSheetBreak = typeof TimeSheetBreakTable.$inferInsert;
export type UpdateTimeSheetBreak = Partial<InsertTimeSheetBreak>;

export type Department = typeof DepartmentTable.$inferSelect;
export type InsertDepartment = typeof DepartmentTable.$inferInsert;
export type UpdateDepartment = Partial<InsertDepartment>;

export type DepartmentMember = typeof DepartmentMemberTable.$inferSelect;
export type InsertDepartmentMember = typeof DepartmentMemberTable.$inferInsert;
export type UpdateDepartmentMember = Partial<InsertDepartmentMember>;

export type Address = typeof AddressTable.$inferSelect;
export type InsertAddress = typeof AddressTable.$inferInsert;
export type UpdateAddress = Partial<InsertAddress>;

export type Note = typeof NotesTable.$inferSelect;
export type InsertNote = typeof NotesTable.$inferInsert;
export type UpdateNote = Partial<InsertNote>;

type StorageListFunction = SupabaseClient["storage"]["from"];
type ListFunctionReturn = ReturnType<StorageListFunction>;
type StorageFilePromise = Awaited<ReturnType<ListFunctionReturn["list"]>>;
type StorageFileType = Pick<StorageFilePromise, "data">["data"];
export type StorageFile = NonNullable<StorageFileType>[number];
