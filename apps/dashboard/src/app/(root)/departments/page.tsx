import Main from "@/components/main";
import { getDepartmentsAction } from "@/features/departments/lib/departments.actions";
import type { Metadata } from "next";

import {
  type DepartmentQuery,
  columns,
} from "@/features/departments/components/table/columns";
import { DepartmentsTable } from "@/features/departments/components/table/table";
import { departmentsTableFiltersSearchParamsCache } from "@/features/departments/lib/departments-table-params";

export const metadata: Metadata = {
  title: "Departments",
  description: "Manage your departments",
};
type DepartmentsListPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};
export default async function DepartmentsListPage({
  searchParams,
}: DepartmentsListPageProps) {
  const params = departmentsTableFiltersSearchParamsCache.parse(searchParams);

  const result = await getDepartmentsAction({ ...params });
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
