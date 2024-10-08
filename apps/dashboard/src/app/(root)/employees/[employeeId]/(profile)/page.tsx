import Main from "@/components/main";
import Profile from "./components/profile";

type EmployeePageProps = {
  params: {
    employeeId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function EmployeePage({ params }: EmployeePageProps) {
  const userId = params.employeeId;
  return (
    <section className="flex-grow">
      <Profile userId={userId} />
    </section>
  );
}
