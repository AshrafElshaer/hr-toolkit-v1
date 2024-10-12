import { getAddress } from "@toolkit/supabase/queries";
import AddressForm from "./address-form";
import { Card } from "@toolkit/ui/card";

export async function Address({ userId }: { userId: string }) {
  const { data, error } = await getAddress(userId);
  if (error) {
    return <div>Error getting address</div>;
  }
  return (
    <Card className="flex flex-col gap-4 w-full p-4 ">
      <h3 className="font-bold text-lg">Mailing Address</h3>
      {data ? <AddressForm address={data} /> : null}
    </Card>
  );
}
