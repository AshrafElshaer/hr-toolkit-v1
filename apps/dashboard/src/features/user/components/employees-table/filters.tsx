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



export const statuses = Object.values(EmploymentStatusEnum).map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
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


