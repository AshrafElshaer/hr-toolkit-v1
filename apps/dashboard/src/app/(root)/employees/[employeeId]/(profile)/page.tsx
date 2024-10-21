import { ErrorFallback } from "@/components/error-fallback";
import {
  Address,
  AddressLoading,
} from "@/features/user/components/employee-profile/address";
import {
  EmergencyContacts,
  EmergencyContactsLoading,
} from "@/features/user/components/employee-profile/emergency-contacts";
import {
  Employment,
  EmploymentLoading,
} from "@/features/user/components/employee-profile/employment";
import {
  Profile,
  ProfileLoading,
} from "@/features/user/components/employee-profile/profile";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
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
      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<ProfileLoading />}>
          <Profile userId={userId} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<AddressLoading />}>
          <Address userId={userId} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<EmergencyContactsLoading />}>
          <EmergencyContacts userId={userId} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<EmploymentLoading />}>
          <Employment userId={userId} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

import React from "react";
