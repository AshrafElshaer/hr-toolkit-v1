import { createServerClient } from "@/lib/supabase/server";
import { getUserById, getUserDepartment } from "@toolkit/supabase/queries";

import ProfileClient from "./profile.client";
type ProfileProps = {
  userId: string;
};

export default async function Profile({ userId }: ProfileProps) {
  const [{ data: department, error: departmentError }, { data: user, error }] =
    await Promise.all([getUserDepartment(userId), getUserById(userId)]);

  if (departmentError || !department) {
    return <div>Error: {departmentError?.message}</div>;
  }
  if (error || !user) {
    return <div>Error: {error?.message}</div>;
  }
  return <ProfileClient user={user} department={department} />;
}
