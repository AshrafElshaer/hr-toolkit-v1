import Main from "@/components/main";
import type { Metadata } from "next";

import { getEmployeesAction } from "@/actions/employees.actions";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";
import { columns } from "./_components/employees-table/columns";
import { DataTable } from "./_components/employees-table/data-table";

export const metadata: Metadata = {
  title: "Employees",
  description: "Manage your employees",
};

export default async function Employees() {
  const employeesAction = await getEmployeesAction();

  const employees = employeesAction?.data ?? [];
  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <DataTable
        columns={columns}
        data={employees as unknown as GetOrganizationMembersQuery[]}
      />
    </Main>
  );
}
