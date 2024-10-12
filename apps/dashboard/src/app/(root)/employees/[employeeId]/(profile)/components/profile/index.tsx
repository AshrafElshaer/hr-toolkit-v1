import { getUserById, getUserDepartment } from "@toolkit/supabase/queries";

import { Badge } from "@toolkit/ui/badge";
import { Card } from "@toolkit/ui/card";
import {
  Cake,
  Clock,
  KeyRound,
  LayoutGrid,
  Mail,
  Phone,
  Play,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import ProfileForm from "./profile-form";
import ProfilePic from "./profle-pic";

type ProfileProps = {
  userId: string;
};

export default async function Profile({ userId }: ProfileProps) {
  const { data: user, error } = await getUserById(userId);

  if (error || !user) {
    return <div>Error: {error?.message}</div>;
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
