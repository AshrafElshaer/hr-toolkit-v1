import Main from "@/components/main";
import { Button } from "@toolkit/ui/button";

import { ChevronLeft, Files, User } from "lucide-react";
import { FaRegClock } from "react-icons/fa6";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { TbCalendarPause } from "react-icons/tb";

export default function EmployeePageLoading() {
  return (
    <Main className="flex flex-col gap-4">
      <nav className="flex items-center justify-start gap-2 w-full overflow-x-scroll scrollbar-hide">
        <Button variant="secondary" disabled>
          <ChevronLeft className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Back </span>
        </Button>
        {employeeNavigation.map((item) => {
          const isActive = "/employees/[employeeId]" === item.href;
          return (
            <Button
              key={item.name}
              disabled
              className="min-w-fit"
              variant={isActive ? "secondary" : "ghost"}
            >
              <item.icon className="w-4 h-4 mr-2" />
              <span className=" font-medium">{item.name}</span>
            </Button>
          );
        })}
      </nav>
      {/* {children} */}
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
