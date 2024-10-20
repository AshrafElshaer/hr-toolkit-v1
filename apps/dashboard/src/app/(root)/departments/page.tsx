import Main from "@/components/main";
import { getDepartmentsAction } from "@/features/departments/departments.actions";
import type { Metadata } from "next";

import {
  type DepartmentQuery,
  columns,
} from "@/features/departments/components/table/columns";
import { DepartmentsTable } from "@/features/departments/components/table/table";

export const metadata: Metadata = {
  title: "Departments",
  description: "Manage your departments",
};

export default async function DepartmentsPage() {
  const result = await getDepartmentsAction();
  const departments = result?.data;

  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <DepartmentsTable
        columns={columns}
        data={(departments as unknown as DepartmentQuery[]) ?? []}
      />
    </Main>
  );
}
