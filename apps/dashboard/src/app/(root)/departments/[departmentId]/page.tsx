import Main from "@/components/main";
import { getEmployeesAction } from "@/features/user/actions/employees.actions";
import { columns } from "@/features/user/components/employees-table/columns";
import { EmployeesTable } from "@/features/user/components/employees-table/table";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@toolkit/ui/card";
import { ChartIcon, CheckListIcon, Timer01Icon } from "hugeicons-react";
import { Box, ChartNoAxesCombined } from "lucide-react";

type DepartmentPageProps = {
  params: {
    departmentId: string;
  };
};

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const employeesAction = await getEmployeesAction({
    department: [params.departmentId],
  });

  const employees = employeesAction?.data ?? [];
  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <section className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between font-semibold">
              Projects <Box size={18} strokeWidth={2} />
            </CardTitle>
            <CardContent className="p-0 mt-4 flex justify-between">
              <p>Active</p>
              <p>10</p>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between font-semibold">
              Tasks <CheckListIcon size={18} strokeWidth={2} />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between font-semibold">
              Metrics <ChartNoAxesCombined size={18} strokeWidth={2} />
            </CardTitle>
          </CardHeader>
        </Card>
      </section>
      <EmployeesTable
        columns={columns}
        data={employees as unknown as GetOrganizationMembersQuery[]}
      />
    </Main>
  );
}
