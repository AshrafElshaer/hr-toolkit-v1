import { getEmployeesAction } from "@/actions/user";
import React from "react";

export default async function EmployeesTable() {
  const employeesAction = await getEmployeesAction();
  console.log({ employeesAction });
  const employees = employeesAction?.data ?? [];
  return (
    <section>
      {employees.map((employee) => (
        <div key={employee.user?.id}>{employee.user?.first_name}</div>
      ))}
    </section>
  );
}
