import { getEmployeesAction } from "@/actions/user";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function EmployeesTable() {
  const employeesAction = await getEmployeesAction();

  const employees = employeesAction?.data ?? [];

  return (
    <DataTable
      columns={columns}
      data={employees as GetOrganizationMembersQuery[]}
    />
  );
}
