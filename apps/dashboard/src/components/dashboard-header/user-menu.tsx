"use client";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@toolkit/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@toolkit/ui/dropdown-menu";
import { Skeleton } from "@toolkit/ui/skeleton";
import React from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import type { User } from "@toolkit/supabase/types";
import { LogOutIcon, MessageSquarePlus, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";

export default function UserMenu({ currentUser }: { currentUser: User }) {
  const supabase = createClient();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="overflow-hidden">
        <span className="sr-only">User menu</span>
        <Avatar
          shape="circle"
          size="medium"
          src={currentUser.avatar_url ?? ""}
          initials={currentUser.avatar_url ? undefined : `${currentUser.first_name[0]}${currentUser.last_name[0]}`}
          
        />
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
