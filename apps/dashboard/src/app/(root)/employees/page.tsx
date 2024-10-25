import Main from "@/components/main";
import type { Metadata } from "next";

import { getEmployeesAction } from "@/features/user/actions/employees.actions";
import { columns } from "@/features/user/components/employees-table/columns";
import { EmployeesTable } from "@/features/user/components/employees-table/table";
import { employeesTableFiltersSearchParamsCache } from "@/features/user/lib/employees-table-params";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";

export const metadata: Metadata = {
  title: "Employees",
  description: "Manage your employees",
};
type EmployeesProps = {
  searchParams: Record<string, string | string[] | undefined>;
};
export default async function Employees({ searchParams }: EmployeesProps) {
  const params = employeesTableFiltersSearchParamsCache.parse(searchParams);

  const employeesAction = await getEmployeesAction({
    status: params.status,
    department: params.department,
    role: params.role,
    type: params.type,
    name: params.name,
  });

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
