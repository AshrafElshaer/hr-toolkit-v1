import { Icon } from "@iconify/react";
import { Box, Clock, Home, Layers, Users } from "lucide-react";
import { FiUsers } from "react-icons/fi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { HiMiniBanknotes, HiOutlineBanknotes } from "react-icons/hi2";
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";
import { TbCalendarPause } from "react-icons/tb";

export const sidebarNavigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: <GoHome size={18} />,
    active: <GoHomeFill size={18} />,
  },
  {
    title: "Employees",
    path: "/employees",
    icon: <Icon icon="ph:users" className="text-[18px]" />,
    active: <Icon icon="ph:users-fill" className="text-[18px]" />,
  },
  {
    title: "Departments",
    path: "/departments",
    icon: <Icon icon="ion:grid-outline" className="text-[18px]" />,
    active: <Icon icon="ion:grid" className="text-[18px]" />,
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: <Icon icon="ion:time-outline" className="text-[18px]" />,
    active: <Icon icon="ion:time" className="text-[18px]" />,
  },
  {
    title: "Time Off",
    path: "/time-off",
    icon: <Icon icon="ion:calendar-outline" className="text-[18px]" />,
    active: <Icon icon="ion:calendar" className="text-[18px]" />,
  },
  // {
  //   title: "Payroll",
  //   path: "/payroll",
  //   icon: <HiOutlineBanknotes size={18} />,
  //   active: <HiMiniBanknotes size={18} />,
  // },
  {
    title: "Projects",
    path: "/projects",
    icon: <Icon icon="mingcute:box-3-line" className="text-[18px]" />,
    active: <Icon icon="mingcute:box-3-fill" className="text-[18px]" />,
  },
  {
    title: "Teams",
    path: "/teams",
    icon: <Icon icon="carbon:layers" className="text-[18px]" />,
    active: <Icon icon="ion:layers" className="text-[18px]" />,
  },
  {
    title: "Chats",
    path: "/chats",
    icon: (
      <Icon icon="fluent:chat-multiple-32-regular" className="text-[18px]" />
    ),
    active: (
      <Icon icon="fluent:chat-multiple-32-filled" className="text-[18px]" />
    ),
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
