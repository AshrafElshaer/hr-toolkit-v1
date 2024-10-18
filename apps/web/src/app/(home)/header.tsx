import { Button, buttonVariants } from "@toolkit/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@toolkit/ui/dropdown-menu";
import { KeyRound } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" w-full flex flex-col gap-4 py-28 mx-auto">
      <h1 className=" text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-left sm:text-center font-bold ">
        New Era Of Employees
        <br />
        Management & Collaboration
      </h1>
      <p className="text-left sm:text-center text-sm sm:text-base md:text-lg lg:text-xl text-secondary-foreground max-w-3xl mx-auto">
        Streamline workforce management with comprehensive tools for scheduling,
        project tracking, collaboration, and HR solutions.
      </p>
      <div className="flex items-center justify-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Launch Demo</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>as Admin</DropdownMenuItem>
            <DropdownMenuItem>as Manager</DropdownMenuItem>
            <DropdownMenuItem>as Team Leader</DropdownMenuItem>
            <DropdownMenuItem>as Employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href="https://dashboard.hrtoolkit.app"
          target="_blank"
          className={buttonVariants({ variant: "default" })}
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
