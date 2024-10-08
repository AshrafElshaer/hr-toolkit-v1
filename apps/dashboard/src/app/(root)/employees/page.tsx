import Main from "@/components/main";
import type { Metadata } from "next";
import { Suspense } from "react";
import EmployeesTable from "./_components/employees-table";

export const metadata: Metadata = {
  title: "Employees",
  description: "Manage your employees",
};

export default function Employees() {
  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <Suspense fallback={<div>Loading employees...</div>}>
        <EmployeesTable />
      </Suspense>
    </Main>
  );
}
