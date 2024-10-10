import { createServerClient } from "@/lib/supabase/server";
import { getUserById } from "@toolkit/supabase/queries";

import ProfileClient from "./profile.client";
type ProfileProps = {
  userId: string;
};

export default async function Profile({ userId }: ProfileProps) {
  const supabase = createServerClient({ isAdmin: true });
  const { data: buckets, error: bucketsError } =
    await supabase.storage.listBuckets();
  console.log({ buckets, bucketsError });
  
  const { data: user, error } = await getUserById(userId);
  if (error || !user) {
    return <div>Error: {error?.message}</div>;
  }
  return <ProfileClient user={user} />;
}
