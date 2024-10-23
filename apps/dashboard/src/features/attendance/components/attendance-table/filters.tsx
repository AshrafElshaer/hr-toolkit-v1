import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import {
  EmploymentStatusEnum,
  EmploymentTypeEnum,
  TimeSheetStatusEnum,
  UserRolesEnum,
} from "@toolkit/supabase/types";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = Object.values(TimeSheetStatusEnum).map((status) => ({
  value: status,
  label: status.replace(/_/g, " "),
  }));

export const roles = Object.values(UserRolesEnum).map((role) => ({
  value: role,
  label: role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
}));

export const employmentTypes = Object.values(EmploymentTypeEnum).map(
  (type) => ({
    value: type,
    label: type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }),
);

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
