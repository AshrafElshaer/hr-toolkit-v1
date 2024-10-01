import { getEmployeesAction } from "@/actions/user";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";

export default async function EmployeesTable() {
  const employeesAction = await getEmployeesAction();

  const employees = employeesAction?.data ?? [];

  return (
    <section className="flex-grow flex flex-col">
      <DataTable
        columns={columns}
        data={employees as GetOrganizationMembersQuery[]}
      />
    </section>
  );
}
