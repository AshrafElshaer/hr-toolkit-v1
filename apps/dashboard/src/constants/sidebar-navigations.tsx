import {
  DashboardSquare02Icon,
  Home01Icon,
  MessageMultiple01Icon,
  Timer01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { Box, Layers } from "lucide-react";

import { CiPause1 } from "react-icons/ci";
import { FaPause } from "react-icons/fa6";
import { TbClockPause } from "react-icons/tb";

export const sidebarNavigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Home01Icon size={18} strokeWidth={2} />,
  },
  {
    title: "Employees",
    path: "/employees",
    icon: <UserMultiple02Icon size={18} strokeWidth={2} />,
  },
  {
    title: "Departments",
    path: "/departments",
    icon: <DashboardSquare02Icon size={18} strokeWidth={2} />,
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: <Timer01Icon size={18} strokeWidth={2} />,
  },
  {
    title: "Time Off",
    path: "/time-off",
    icon: <TbClockPause size={18} strokeWidth={2} />,
  },
  // {
  //   title: "Payroll",
  //   path: "/payroll",
  //   icon: <HiOutlineBanknotes size={18} />,
  // },
  {
    title: "Projects",
    path: "/projects",
    icon: <Box size={18} strokeWidth={2} />,
  },
  {
    title: "Teams",
    path: "/teams",
    icon: <Layers size={18} strokeWidth={2} />,
  },
  {
    title: "Chats",
    path: "/chats",
    icon: <MessageMultiple01Icon size={18} strokeWidth={2} />,
  },
];

export const roleBasedNavigation = (role: string) => {
  switch (role) {
    case "admin":
      return sidebarNavigation;
    case "manager":
      return sidebarNavigation.filter((route) => route.path !== "/employees");
    case "team_lead":
    case "staff":
      return sidebarNavigation.filter(
        (route) => route.path !== "/departments" && route.path !== "/employees",
      );
    default:
      return [];
  }
};
