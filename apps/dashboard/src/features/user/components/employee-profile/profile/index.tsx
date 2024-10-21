import { getUserById } from "@toolkit/supabase/queries";

import { Card } from "@toolkit/ui/card";

import { createServerClient } from "@/lib/supabase/server";
import ProfileForm from "./profile-form";
import ProfilePic from "./profle-pic";

type ProfileProps = {
  userId: string;
};

export async function Profile({ userId }: ProfileProps) {
  const supabase = createServerClient();
  const { data: user, error } = await getUserById(supabase, userId);

  if (error || !user) {
    return;
  }

  return (
    <Card className="flex flex-col gap-4 w-full p-4 ">
      <h3 className="font-bold text-lg">Personal Details</h3>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className=" flex flex-col items-center min-w-fit">
          <ProfilePic user={user} />
        </div>
        <ProfileForm user={user} />
      </div>
    </Card>
  );
}

export { ProfileLoading } from "./profile.loading";
