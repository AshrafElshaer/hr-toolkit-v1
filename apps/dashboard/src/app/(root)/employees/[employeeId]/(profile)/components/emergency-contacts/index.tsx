import { getEmergencyContacts } from "@toolkit/supabase/queries";
import { Card } from "@toolkit/ui/card";
import Link from "next/link";

export async function EmergencyContacts({ userId }: { userId: string }) {
  const { data, error } = await getEmergencyContacts(userId);

  if (error) {
    return <div>Error getting emergency contacts</div>;
  }
  return (
    <div className="flex flex-col gap-4 w-full p-4 ">
      <h3 className="font-bold text-lg">Emergency Contacts</h3>
      <div className="flex items-center gap-4 flex-wrap *:flex-1">
        <div className="flex flex-col gap-2 min-w-fit">
          <p className="text-secondary-foreground">Name </p>
          <p className="text-semibold">{data?.contact_name}</p>
        </div>
        <div className="flex flex-col gap-2 min-w-fit">
          <p className="text-secondary-foreground">Email </p>
          <Link
            href={`mailto:${data?.contact_email}`}
            className="text-semibold"
          >
            {data?.contact_email}
          </Link>
        </div>
        <div className="flex flex-col gap-2 min-w-fit">
          <p className="text-secondary-foreground">Phone Number </p>
          <p className="text-semibold">{data?.contact_number}</p>
        </div>
        <div className="flex flex-col gap-2 min-w-fit">
          <p className="text-secondary-foreground">Relationship </p>
          <p className="text-semibold">{data?.contact_relation}</p>
        </div>
      </div>
    </div>
  );
}
