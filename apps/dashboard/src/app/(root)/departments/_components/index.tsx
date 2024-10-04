import { getDepartmentsAction } from "@/actions/departments.actions";
import { DataTableToolbar } from "./data-table-toolbar";

export default async function Departments() {
  const result = await getDepartmentsAction();
  const departments = result?.data;

  return (
    <>
      <DataTableToolbar />
      <div>Departments</div>
      <pre>{JSON.stringify(departments, null, 2)}</pre>
    </>
  );
};
