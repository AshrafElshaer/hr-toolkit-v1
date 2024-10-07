"use client";

import Main from "@/components/main";
import { Button, buttonVariants } from "@toolkit/ui/button";
import { cn } from "@toolkit/ui/cn";
import { Calendar, ChevronLeft, FileText, Files, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaRegClock } from "react-icons/fa6";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { TbCalendarPause } from "react-icons/tb";

export default function EmployeeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { employeeId: string };
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Main className="flex flex-col gap-4">
      <nav className="flex items-center justify-start gap-2 w-full overflow-x-scroll scrollbar-hide">
        <Button variant="secondary" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Back </span>
        </Button>
        {employeeNavigation.map((item) => {
          const itemPath = `/employees/${params.employeeId}${item.href.split("[employeeId]")[1] || ""}`;
          const isActive = pathname === itemPath;
          return (
            <Link
              key={item.name}
              href={itemPath}
              className={cn(
                buttonVariants({
                  variant: isActive ? "secondary" : "ghost",
                  className: "min-w-fit",
                }),
              )}
            >
              <item.icon className="w-4 h-4 mr-2" />
              <span className=" font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      {children}
    </Main>
  );
}

const employeeNavigation = [
  {
    name: "Profile",
    href: "/employees/[employeeId]",
    icon: User,
  },
  {
    name: "Attendance",
    href: "/employees/[employeeId]/attendance",
    icon: FaRegClock,
  },
  {
    name: "Time Off",
    href: "/employees/[employeeId]/time-off",
    icon: TbCalendarPause,
  },
  {
    name: "Payroll",
    href: "/employees/[employeeId]/payroll",
    icon: HiOutlineBanknotes,
  },
  {
    name: "Documents",
    href: "/employees/[employeeId]/documents",
    icon: Files,
  },
];
