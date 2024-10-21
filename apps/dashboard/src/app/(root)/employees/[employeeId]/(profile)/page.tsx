import {
  Address,
  AddressLoading,
} from "@/features/user/components/employee-profile/address";
import { EmergencyContacts } from "@/features/user/components/employee-profile/emergency-contacts";
import { Employment } from "@/features/user/components/employee-profile/employment";
import {
  Profile,
  ProfileLoading,
} from "@/features/user/components/employee-profile/profile";
import { Suspense } from "react";

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
      <Suspense fallback={<ProfileLoading />}>
        <Profile userId={userId} />
      </Suspense>
      <Suspense fallback={<AddressLoading />}>
        <Address userId={userId} />
      </Suspense>
      <Suspense fallback={<div>Loading emergency contacts...</div>}>
        <EmergencyContacts userId={userId} />
      </Suspense>
      <Suspense fallback={<div>Loading employment details...</div>}>
        <Employment userId={userId} />
      </Suspense>
    </section>
  );
}
