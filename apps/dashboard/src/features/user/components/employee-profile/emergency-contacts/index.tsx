import { createServerClient } from "@/lib/supabase/server";
import { getEmergencyContacts } from "@toolkit/supabase/queries";
import { Card } from "@toolkit/ui/card";

import ContactForm from "./contact-form";
import { PhoneCall } from "lucide-react";
import { NewEmergencyContact } from "./new-contact";

export async function EmergencyContacts({ userId }: { userId: string }) {
  const supabase = createServerClient();
  const { data, error } = await getEmergencyContacts(supabase, userId);

  if (error) {
    return <div>Error getting emergency contacts</div>;
  }
  return (
    <Card className="flex flex-col gap-4 w-full p-4 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Emergency Contacts</h3>
        <NewEmergencyContact userId={userId} />
      </div>
      {data && data.length > 0 ? (
        data.map((contact) => (
          <ContactForm
            contact={contact}
            key={contact.id}
            contactsLength={data.length}
          />
        ))
      ) : (
        <div className="text-center text-secondary-foreground h-40 flex flex-col items-center justify-center">
          <PhoneCall className="size-8" />
          <p>No emergency contacts available.</p>
        </div>
      )}
    </Card>
  );
}


export { EmergencyContactsLoading } from "./contacts.loading";
