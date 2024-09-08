import type { Organization, TimeSheet, User } from "./index";

export type UserRoles = User["role"];
export type EmploymentStatus = User["employment_status"];
export type EmploymentType = User["employment_type"];

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

type TimeSheetStatus = TimeSheet["status"];

export const TimeSheetStatusEnum: {
  [key in TimeSheetStatus]: key;
} = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
  clocked_in: "clocked_in",
  clocked_out: "clocked_out",
};
