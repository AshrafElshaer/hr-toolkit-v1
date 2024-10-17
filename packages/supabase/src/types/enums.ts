import type { Database } from "./database";
import type { Organization, TimeSheet, User } from "./index";

type UserRoles = Database["public"]["Enums"]["user_roles"];
type EmploymentStatus = Database["public"]["Enums"]["employment_status"];
type EmploymentType = Database["public"]["Enums"]["employment_type"];

export const UserRolesEnum: {
  [key in UserRoles]: key;
} = {
  admin: "admin",
  manager: "manager",
  staff: "staff",
  team_lead: "team_lead",
};

export const EmploymentStatusEnum: {
  [key in EmploymentStatus]: key;
} = {
  active: "active",
  inactive: "inactive",
  terminated: "terminated",
};

export const EmploymentTypeEnum: {
  [key in EmploymentType]: key;
} = {
  full_time: "full_time",
  part_time: "part_time",
  contract: "contract",
  internship: "internship",
};

type OrganizationType = Organization["type"];

export const OrganizationTypeEnum: {
  [key in OrganizationType]: key;
} = {
  "for-profit": "for-profit",
  "non-profit": "non-profit",
  government: "government",
};

type PayrollPattern = Organization["payroll_pattern"];

export const PayrollPatternEnum: {
  [key in PayrollPattern]: key;
} = {
  weekly: "weekly",
  "bi-weekly": "bi-weekly",
  monthly: "monthly",
};

type TimeSheetStatus = Database["public"]["Enums"]["time_sheet_status"];

export const TimeSheetStatusEnum: {
  [key in TimeSheetStatus]: key;
} = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  clocked_in: "clocked_in",
  clocked_out: "clocked_out",
};
