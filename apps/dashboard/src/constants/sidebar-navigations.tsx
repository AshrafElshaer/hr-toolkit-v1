import { Box, Clock, Home, Layers, Users } from "lucide-react";
import { TbCalendarPause } from "react-icons/tb";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { LuLayoutGrid } from "react-icons/lu";
import { IoChatbubblesOutline } from "react-icons/io5";

export const sidebarNavigation = [
	{
		title: "Dashboard",
		path: "/",
		icon: <Home size={18} />,
	},
	{
		title: "Employees",
		path: "/employees",
		icon: <Users size={18} />,
	},
	{
		title: "Departments",
		path: "/departments",
		icon: <LuLayoutGrid size={18} />,
	},
	{
		title: "Attendance",
		path: "/attendance",
		icon: <Clock size={18} />,
	},
	{
		title: "Time Off",
		path: "/time-off",
		icon: <TbCalendarPause size={18} />,
	},
	{
		title: "Payroll",
		path: "/payroll",
		icon: <HiOutlineBanknotes size={18} />,
	},
	{
		title: "Projects",
		path: "/projects",
		icon: <Box size={18} />,
	},
	{
		title: "Teams",
		path: "/teams",
		icon: <Layers size={18} />,
	},
	{
		title: "Messages",
		path: "/messages",
		icon: <IoChatbubblesOutline size={18} />,
	},
];

export const roleBasedNavigation = (role: string) => {
	switch (role) {
		case "admin":
			return sidebarNavigation;
		case "manager":
			return sidebarNavigation.filter((route) => route.path !== "/departments");
		case "team_lead":
		case "staff":
			return sidebarNavigation.filter(
				(route) => route.path !== "/departments" && route.path !== "/employees",
			);
		default:
			return [];
	}
};
