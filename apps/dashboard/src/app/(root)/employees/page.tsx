import Main from "@/components/main";
import NewEmployee from "./components/new-employee";
import EmployeesTable from "./components/employees-table";

export default function Employees() {
  return (
    <Main className="flex flex-col gap-4 overflow-scroll" isMaxHeight>
      <NewEmployee />
      <EmployeesTable />
    </Main>
  );
}
