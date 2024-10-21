import { createServerClient } from "@/lib/supabase/server";
import { getAddress } from "@toolkit/supabase/queries";
import { Button } from "@toolkit/ui/button";
import { Card } from "@toolkit/ui/card";
import { MapPin, Plus } from "lucide-react";
import { AddressForm } from "./address-form";
import { NewAddress } from "./new-address";

export async function Address({ userId }: { userId: string }) {
  const supabase = createServerClient();
  const { data, error } = await getAddress(supabase, userId);
  if (error) {
    return <div>Error getting address</div>;
  }
  const addressesLength = data?.length ?? 0;
  return (
    <Card className="flex flex-col gap-4 w-full p-4 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Mailing Address</h3>
        <NewAddress userId={userId} />
      </div>
      {data && data.length > 0 ? (
        data.map((address) => (
          <AddressForm
            address={address}
            key={address.id}
            addressesLength={addressesLength}
          />
        ))
      ) : (
        <div className="text-center text-secondary-foreground h-40 flex flex-col items-center justify-center">
          <MapPin className="size-8" />
          <p>No address information available.</p>
        </div>
      )}
    </Card>
  );
}

export { AddressLoading } from "./address.loading";
