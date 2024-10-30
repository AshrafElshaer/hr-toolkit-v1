import Main from "@/components/main";
import { getDepartmentsAction } from "@/features/departments/lib/departments.actions";
import type { Metadata } from "next";

import {
  type DepartmentQuery,
  columns,
} from "@/features/departments/components/table/columns";
import { DepartmentsTable } from "@/features/departments/components/table/table";
import { departmentsTableFiltersSearchParamsCache } from "@/features/departments/lib/departments-table-params";
import { createServerClient } from "@/lib/supabase/server";
import { getUserDepartment } from "@toolkit/supabase/queries";
import { redirect } from "next/navigation";

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

  const supabase = createServerClient();
  const { data: user } = await supabase.auth.getUser();
  const userRole = user?.user?.user_metadata?.role;

  if (userRole !== "admin") {
    const { data: userDepartmentData } = await getUserDepartment(
      supabase,
      user.user?.id ?? "",
    );
    const userDepartment = userDepartmentData?.department;
    if (!userDepartment) redirect("/");
    return redirect(`/departments/${userDepartment.id}`);
  }

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
