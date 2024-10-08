import Main from "@/components/main";
import type { Metadata } from "next";

import EmployeesTable from "./_components/employees-table";

export const metadata: Metadata = {
  title: "Employees",
  description: "Manage your employees",
};

export default function Employees() {
  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <EmployeesTable />
    </Main>
  );
}
