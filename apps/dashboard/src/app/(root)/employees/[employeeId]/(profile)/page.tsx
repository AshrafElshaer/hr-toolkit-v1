import { Address } from "./components/address";
import { EmergencyContacts } from "./components/emergency-contacts";
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
    <section className="flex-grow space-y-4">
      <Profile userId={userId} />
      <Address />
      <EmergencyContacts />
    </section>
  );
}
