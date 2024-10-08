import { getUserById } from "@toolkit/supabase/queries";
import { Avatar } from "@toolkit/ui/avatar";
import { Card } from "@toolkit/ui/card";
import { Separator } from "@toolkit/ui/separator";
import { Mail, Phone } from "lucide-react";

type ProfileProps = {
  userId: string;
};

export default async function Profile({ userId }: ProfileProps) {
  const { data: user, error } = await getUserById(userId);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Card className="flex flex-col gap-2 w-fit p-0 py-8">
      <Avatar
        src={user?.avatar_url}
        initials={`${user?.first_name[0]}${user?.last_name[0]}`}
        // size="large"
        className="mx-auto size-24"
        shape="circle"
      />
      <div className="flex flex-col gap-1 items-center">
        <h3 className="text-lg font-bold">
          {user?.first_name} {user?.last_name}
        </h3>
        <p className="text-secondary-foreground">{user?.job_title}</p>
      </div>
      <Separator className="w-full" />

      <h3 className="font-bold">Personal Information</h3>
      <div className="space-y-2 text-sm px-4">
        <div className="flex items-center gap-2">
          <Mail className="size-4" />
          <p>{user?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="size-4" />
          <p>{user?.phone_number}</p>
        </div>
        <div className="flex items-center gap-2">

        </div>
      </div>
    </Card>
  );
}
