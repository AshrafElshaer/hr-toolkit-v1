"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@toolkit/ui/sheet";
import { PanelLeftOpen, X } from "lucide-react";
import React from "react";
import LogoSVG from "../logo-svg";

import { roleBasedNavigation } from "@/constants/sidebar-navigations";
import type { User } from "@toolkit/supabase/types";
import { buttonVariants } from "@toolkit/ui/button";
import { cn } from "@toolkit/ui/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileSidebar({ currentUser }: { currentUser: User }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="h-full">
        <PanelLeftOpen size={20} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[230px]">
        <SheetHeader className="mb-4 p-4">
          <section className="flex justify-between items-center">
            <SheetTitle className="flex items-center gap-2">
              <LogoSVG className="fill-current w-6 h-6" />
              <h1 className="text-lg font-semibold">HR Toolkit</h1>
            </SheetTitle>
            <SheetClose>
              <X size={18} />
            </SheetClose>
          </section>
        </SheetHeader>
        <nav className="w-full h-full">
          <ul className="flex flex-col items-start justify-start h-full gap-1 p-2">
            {roleBasedNavigation(currentUser.role ?? "").map((route) => {
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
                        className: "w-full justify-start gap-2 relative",
                      }),
                      route.path === "/projects" && "mt-6",
                      isActivePath && "font-semibold",
                    )}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    {route.icon}
                    {route.title}
                    {isActivePath ? (
                      <div className="absolute right-0 top-1 bottom-1 w-[3px] rounded-l bg-primary" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
