import Main from "@/components/main";
import NewEmployee from "./_components/page-header";
import EmployeesTable from "./_components/employees-table";

export default function Employees() {
  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <NewEmployee />
      <EmployeesTable />
    </Main>
  );
}
