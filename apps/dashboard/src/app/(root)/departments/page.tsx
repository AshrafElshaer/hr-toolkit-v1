import { getDepartmentsAction } from "@/actions/departments.actions";
import Main from "@/components/main";
import type { Metadata } from "next";

import { columns } from "./_components/culomns";
import { DataTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "Departments",
  description: "Manage your departments",
};

export default async function DepartmentsPage() {
  const result = await getDepartmentsAction();
  const departments = result?.data;

  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <DataTable columns={columns} data={departments ?? []} />
    </Main>
  );
}
