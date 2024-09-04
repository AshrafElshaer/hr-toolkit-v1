import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  AddressTable,
  DepartmentMemberTable,
  DepartmentTable,
  OrganizationTable,
  TimeSheetTable,
  UserTable,
} from "../db";

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
export type Organization = typeof OrganizationTable.$inferSelect;
export type InsertOrganization = typeof OrganizationTable.$inferInsert;

type OrganizationType = "for-profit" | "non-profit" | "government";

export const OrganizationTypeEnum: {
  [key in OrganizationType]: key;
} = {
  "for-profit": "for-profit",
  "non-profit": "non-profit",
  government: "government",
};

type PayrollPattern = "weekly" | "bi-weekly" | "monthly";

export const PayrollPatternEnum: {
  [key in PayrollPattern]: key;
} = {
  weekly: "weekly",
  "bi-weekly": "bi-weekly",
  monthly: "monthly",
};

export type TimeSheet = typeof TimeSheetTable.$inferSelect;
export type InsertTimeSheet = typeof TimeSheetTable.$inferInsert;

type TimeSheetStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "clocked_in"
  | "clocked_out";

export const TimeSheetStatusEnum: {
  [key in TimeSheetStatus]: key;
} = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  clocked_in: "clocked_in",
  clocked_out: "clocked_out",
};

export type Department = typeof DepartmentTable.$inferSelect;
export type InsertDepartment = typeof DepartmentTable.$inferInsert;

export type DepartmentMember = typeof DepartmentMemberTable.$inferSelect;
export type InsertDepartmentMember = typeof DepartmentMemberTable.$inferInsert;

export type Address = typeof AddressTable.$inferSelect;
export type InsertAddress = typeof AddressTable.$inferInsert;

type StorageListFunction = SupabaseClient["storage"]["from"];
type ListFunctionReturn = ReturnType<StorageListFunction>;
type StorageFilePromise = Awaited<ReturnType<ListFunctionReturn["list"]>>;
type StorageFileType = Pick<StorageFilePromise, "data">["data"];
export type StorageFile = NonNullable<StorageFileType>[number];
