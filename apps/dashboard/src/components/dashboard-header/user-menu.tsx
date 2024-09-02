"use client";
import React from "react";
import { Skeleton } from "@v1/ui/skeleton";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@v1/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

import Link from "next/link";
import { LogOutIcon, MessageSquarePlus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
import type { User } from "@v1/supabase/types";
import { ThemeToggle } from "@/components/theme-toggle";

export default function UserMenu({
	currentUser,
}: { currentUser: User}) {
	const supabase = createClient();
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="h-8 w-8 cursor-pointer">
					<AvatarImage src={currentUser.avatar_url ?? ""} />
					<AvatarFallback>
						{currentUser.first_name ? currentUser.first_name[0] : ""}
						{currentUser.last_name ? currentUser.last_name[0] : ""}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				sideOffset={14}
				className="right-12 w-52"
				align="end"
			>
				<DropdownMenuLabel>
					{currentUser.first_name} {currentUser.last_name}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<button
						type="button"
						className="flex w-full items-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
						disabled
					>
						<MdSupportAgent className="h-4 w-4" />
						<span>Support</span>
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<button
						type="button"
						className="flex w-full items-center space-x-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
						disabled
					>
						<BiMessageRoundedAdd className="h-4 w-4" />
						<span>Feedback</span>
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href="/settings"
						className="flex items-center space-x-2 cursor-pointer"
					>
						<Settings className="h-4 w-4" />
						<span>Setting</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<ThemeToggle />
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<button
						type="button"
						className="flex w-full items-center space-x-2 px-2  cursor-pointer"
						onClick={() =>
							supabase.auth.signOut().then(() => {
								router.push("/auth");
							})
						}
					>
						<LogOutIcon className="h-4 w-4" />
						<span>Sign out</span>
					</button>

				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
