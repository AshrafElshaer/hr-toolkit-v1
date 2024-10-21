import { AddressLoading } from "@/features/user/components/employee-profile/address";
import { EmergencyContactsLoading } from "@/features/user/components/employee-profile/emergency-contacts";
import { EmploymentLoading } from "@/features/user/components/employee-profile/employment";
import { ProfileLoading } from "@/features/user/components/employee-profile/profile";

export default function ProfilePageLoading() {
  return (
    <section className="flex-grow space-y-4">
      <ProfileLoading />
      <AddressLoading />
      <EmergencyContactsLoading />
      <EmploymentLoading />
    </section>
  );
}
