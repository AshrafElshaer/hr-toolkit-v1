import type { SupabaseClient } from "@supabase/supabase-js";

import type { TimeSheetStatusEnum } from "./enums";

export * from "./enums";
export * from "./statements";
export * from "./database";
import type { Database } from "./database";

export type SupabaseInstance = SupabaseClient<Database>;

type UserTable = Database["public"]["Tables"]["user"];
export type User = UserTable["Row"];
export type InsertUser = UserTable["Insert"];
export type UpdateUser = UserTable["Update"];

type OrganizationTable = Database["public"]["Tables"]["organization"];
export type Organization = OrganizationTable["Row"];
export type InsertOrganization = OrganizationTable["Insert"];
export type UpdateOrganization = OrganizationTable["Update"];

type OrganizationMemberTable =
  Database["public"]["Tables"]["organization_members"];
export type OrganizationMember = OrganizationMemberTable["Row"];
export type InsertOrganizationMember = OrganizationMemberTable["Insert"];
export type UpdateOrganizationMember = OrganizationMemberTable["Update"];

type TimeSheetTable = Database["public"]["Tables"]["time_sheet"];
export type TimeSheet = TimeSheetTable["Row"];
export type InsertTimeSheet = TimeSheetTable["Insert"];
export type UpdateTimeSheet = TimeSheetTable["Update"];

type TimeSheetBreakTable = Database["public"]["Tables"]["time_sheet_break"];
export type TimeSheetBreak = TimeSheetBreakTable["Row"];
export type InsertTimeSheetBreak = TimeSheetBreakTable["Insert"];
export type UpdateTimeSheetBreak = TimeSheetBreakTable["Update"];

type DepartmentTable = Database["public"]["Tables"]["department"];
export type Department = DepartmentTable["Row"];
export type InsertDepartment = DepartmentTable["Insert"];
export type UpdateDepartment = DepartmentTable["Update"];

type DepartmentMemberTable = Database["public"]["Tables"]["department_member"];
export type DepartmentMember = DepartmentMemberTable["Row"];
export type InsertDepartmentMember = DepartmentMemberTable["Insert"];
export type UpdateDepartmentMember = DepartmentMemberTable["Update"];

type AddressTable = Database["public"]["Tables"]["addresses"];
export type Address = AddressTable["Row"];
export type InsertAddress = AddressTable["Insert"];
export type UpdateAddress = AddressTable["Update"];

type EmergencyContactTable = Database["public"]["Tables"]["emergency_contacts"];
export type EmergencyContact = EmergencyContactTable["Row"];
export type InsertEmergencyContact = EmergencyContactTable["Insert"];
export type UpdateEmergencyContact = EmergencyContactTable["Update"];

type NoteTable = Database["public"]["Tables"]["notes"];
export type Note = NoteTable["Row"];
export type InsertNote = NoteTable["Insert"];
export type UpdateNote = NoteTable["Update"];

type StorageListFunction = SupabaseInstance["storage"]["from"];
type ListFunctionReturn = ReturnType<StorageListFunction>;
type StorageFilePromise = Awaited<ReturnType<ListFunctionReturn["list"]>>;
type StorageFileType = Pick<StorageFilePromise, "data">["data"];
export type StorageFile = NonNullable<StorageFileType>[number];
