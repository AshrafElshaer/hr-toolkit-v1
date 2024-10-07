import Main from "@/components/main";

type EmployeePageProps = {
  params: {
    employeeId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function EmployeePage({ params }: EmployeePageProps) {
  return (
    <section className="flex-grow border">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employee</h1>
        <p>{params.employeeId}</p>
      </div>
    </section>
  );
}
