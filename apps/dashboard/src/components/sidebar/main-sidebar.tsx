"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { roleBasedNavigation } from "@/constants/sidebar-navigations";
import { cn } from "@v1/ui/cn";

import type { ReactSetState } from "@/types";
import type { User } from "@v1/supabase/types";

import { buttonVariants } from "@v1/ui/button";
import { Separator } from "@v1/ui/separator";
import Link from "next/link";
import LogoSVG from "../logo-svg";

function MainSidebar({
	setIsMobileOpen,
	currentUser,
}: {
	setIsMobileOpen?: ReactSetState<boolean>;
	currentUser: User;
}) {
	const pathname = usePathname();
	const allowedNavigation = useMemo(() => {
		return roleBasedNavigation(currentUser.role ?? "");
	}, [currentUser.role]);

	return (
		<nav className=" hidden md:block shadow-md w-[3.3rem] border-r border-t fixed top-0 bottom-0 left-0 hover:w-[185px] transition-all group z-40 bg-background">
			<div className="flex items-center justify-start  p-3 relative w-full">
				<LogoSVG className="text-foreground fill-current size-7" />
				<div className="w-full font-semibold opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity delay-[25ms] absolute left-12 text-lg min-w-28">
					Hr ToolKit
				</div>
			</div>
			<ul className="flex flex-col items-start justify-start h-full gap-1 p-2">
				{allowedNavigation.map((route) => {
					const isActivePath =
						pathname === route.path ||
						route.path === pathname.split("/").slice(0, 2).join("/");

					return (
						<li key={route.path} className="w-full justify-start">
							<Link
								href={route.path}
								className={cn(
									buttonVariants({
										variant: isActivePath ? "secondary" : "ghost",
										className: "w-full justify-start p-2 gap-2 relative ",
									}),
									route.path === "/projects" && "mt-6",
									isActivePath && "font-semibold",
								)}
								onClick={() => {
									setIsMobileOpen?.(false);
								}}
							>
								{route.icon}
								<div className="min-w-20 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity delay-[25ms] absolute left-8">
									{route.title}
								</div>
								{isActivePath ? (
									<div className="absolute right-0 top-1 bottom-1 w-[3px] rounded-l bg-primary opacity-0 group-hover:opacity-100 transition-opacity delay-[25ms]" />
								) : null}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default MainSidebar;
