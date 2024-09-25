import Main from "@/components/main";
import { buttonVariants } from "@v1/ui/button";
import {  ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import NewEmployee from "./new-employee";

export const metadata: Metadata = {
  title: "New Employee",
  description: "Add a new employee",
};

export default function NewEmployeePage() {
  return (
    <Main className="flex flex-col gap-4">
      <Link
        href="/employees"
        className={buttonVariants({
          variant: "secondary",
          className: "items-center gap-1 w-fit font-medium",
        })}
      >
        <ChevronLeft className="size-4" />
        <span>Back</span>
      </Link>
      <NewEmployee />
    </Main>
  );
}
