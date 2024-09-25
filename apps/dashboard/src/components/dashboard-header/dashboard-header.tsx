import React from "react";
import LogoSVG from "../logo-svg";
import UserMenu from "./user-menu";

import type { User } from "@toolkit/supabase/types";
import dynamic from "next/dynamic";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { CommandMenu } from "./command-menu";
const CurrentTime = dynamic(() => import("./current-time"), { ssr: false });

export default function DashboardHeader({
  currentUser,
}: { currentUser: User }) {
  return (
    <header className="px-2 md:px-4  w-full h-[50] top-0 ">
      <ul className="flex items-center justify-between h-[50px] w-full gap-4">
        <li className="grid h-fit md:hidden">
          <MobileSidebar currentUser={currentUser} />
        </li>
        <li className=" flex md:hidden items-center gap-2 text-foreground">
          <LogoSVG className="fill-current w-6 h-6 select-none" />
          <h1 className="text-lg font-semibold select-none">HR Toolkit</h1>
        </li>
        <li className="ml-[53px] hidden md:block">
          <CommandMenu />
        </li>
        <li className="ml-auto hidden md:block">
          <CurrentTime />
        </li>

        <li className="flex items-center justify-end gap-2 ">
          <UserMenu currentUser={currentUser} />
        </li>
      </ul>
    </header>
  );
}
