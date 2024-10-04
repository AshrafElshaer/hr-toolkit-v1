import { getDepartmentsAction } from "@/actions/departments.actions";
import { DataTableToolbar } from "./data-table-toolbar";
import { columns } from "./culomns";
import { DataTable } from "./data-table";

export default async function Departments() {
  const result = await getDepartmentsAction();
  const departments = result?.data;

  return (
  <DataTable
    columns={columns}
    data={departments ?? []}
  />
  );
};
