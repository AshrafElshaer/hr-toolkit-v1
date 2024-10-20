import Main from "@/components/main";
import type { Metadata } from "next";

import { getEmployeesAction } from "@/features/user/actions/employees.actions";
import { columns } from "@/features/user/components/employees-table/columns";
import { EmployeesTable } from "@/features/user/components/employees-table/table";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";

export const metadata: Metadata = {
  title: "Employees",
  description: "Manage your employees",
};

export default async function Employees() {
  const employeesAction = await getEmployeesAction();

  const employees = employeesAction?.data ?? [];
  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <EmployeesTable
        columns={columns}
        data={employees as unknown as GetOrganizationMembersQuery[]}
      />
    </Main>
  );
}
