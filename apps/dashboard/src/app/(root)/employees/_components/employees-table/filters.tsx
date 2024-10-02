import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import {
  EmploymentStatusEnum,
  EmploymentTypeEnum,
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

export const statuses = Object.values(EmploymentStatusEnum).map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
}));

export const roles = Object.values(UserRolesEnum).map((role) => ({
  value: role,
  label: role.charAt(0).toUpperCase() + role.slice(1),
}));

export const employmentTypes = Object.values(EmploymentTypeEnum).map(
  (type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
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
