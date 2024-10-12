import { getAddress } from "@toolkit/supabase/queries";

export async function Address({ userId }: { userId: string }) {
  const { data, error } = await getAddress(userId);
  if (error) {
    return <div>Error getting address</div>;
  }
  return (
    <div className="flex flex-col gap-4 w-full p-4 ">
      <h3 className="font-bold text-lg">Mailing Address</h3>
      <div className="flex flex-wrap gap-2">
        <p>{data?.address_1}</p>
        <p>{data?.address_2} ,</p>
        <p>{data?.city} ,</p>
        <p>{data?.state} ,</p>
        <p>{data?.zip_code} ,</p>
        <p>{data?.country}</p>
      </div>
    </div>
  );
}
