import { AddressLoading } from "@/features/user/components/employee-profile/address";
import { ProfileLoading } from "@/features/user/components/employee-profile/profile";

export function ProfilePageLoading() {
  return (
    <section className="flex-grow space-y-4">
      <ProfileLoading />
      <AddressLoading />
    </section>
  );
}
