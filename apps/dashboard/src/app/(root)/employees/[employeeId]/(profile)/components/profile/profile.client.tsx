"use client";
import { updateUserByIdAction } from "@/actions/users.actions";
import UploadZone from "@/components/upload-zone";
import { useSupabase } from "@/hooks/use-supabase";

import { uploadUserAvatar } from "@/lib/supabase/storage/upload";
import type { User } from "@toolkit/supabase/types";
import type { Department, DepartmentMember } from "@toolkit/supabase/types";
import { Avatar } from "@toolkit/ui/avatar";
import { Badge } from "@toolkit/ui/badge";
import { Card } from "@toolkit/ui/card";
import { Separator } from "@toolkit/ui/separator";
import {
  Cake,
  Calendar,
  Clock,
  KeyRound,
  LayoutGrid,
  Mail,
  Phone,
  Play,
} from "lucide-react";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type ProfileClientProps = {
  user: User;
  department: DepartmentMember & { department: Department };
};
export default function ProfileClient({
  user,
  department,
}: ProfileClientProps) {
  const supabase = useSupabase();
  const router = useRouter();

  const onImageDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    toast.promise(
      async () => {
        const { error, data } = await uploadUserAvatar(user.id, file);
        if (error || !data) {
          throw new Error("Error uploading image");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(data.path);

        const result = await updateUserByIdAction({
          id: user.id,
          avatar_url: publicUrl,
        });

        if (result?.serverError) {
          throw new Error(result?.serverError);
        }

        router.refresh();
      },
      {
        loading: "Uploading profile picture...",
        success: "Profile picture uploaded successfully",
        error: ({ error }) => error.message,
      },
    );
  };
  return (
    <Card className="flex flex-col gap-2 w-fit p-0 py-8">
      <UploadZone
        className="mx-auto size-20 rounded-full p-0"
        options={{
          onDrop: onImageDrop,
          accept: { "image/*": [".png", ".jpg", ".jpeg"] },
          maxFiles: 1,
        }}
      >
        <Avatar
          src={user?.avatar_url}
          initials={user?.avatar_url ? undefined : `${user?.first_name[0]}${user?.last_name[0]}`}
          // size="large"
          className="w-full h-full"
          shape="circle"
        />
      </UploadZone>
      <div className="flex flex-col gap-1 items-center">
        <h3 className="text-lg font-bold">
          {user?.first_name} {user?.last_name}
        </h3>
        <p className="text-secondary-foreground">{user?.job_title}</p>
        <Badge
          variant={
            user?.employment_status === "active"
              ? "success"
              : user?.employment_status === "inactive"
                ? "destructive"
                : "warning"
          }
          className="capitalize"
        >
          {user?.employment_status.replace("_", " ")}
        </Badge>
      </div>

      <h3 className="font-bold text-lg px-4 mt-4">Personal Information</h3>
      <div className="space-y-2  px-4 text-accent-foreground">
        <Link
          href={`mailto:${user?.email}`}
          className="flex items-center gap-2 hover:underline"
        >
          <Mail className="size-4" />
          <p>{user?.email}</p>
        </Link>
        <div className="flex items-center gap-2">
          <Phone className="size-4" />
          <p>{user?.phone_number}</p>
        </div>
        <div className="flex items-center gap-2">
          <Cake className="size-4" />
          <p>{moment(user?.date_of_birth).format("DD MMM YYYY")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Play className="size-4" />
          <p>{moment(user?.hire_date).format("DD MMM YYYY")}</p>
        </div>

        <div className="flex items-center gap-2">
          <LayoutGrid className="size-4" />
          <p>
            {department?.department.name} - {department?.department.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <KeyRound className="size-4" />
          <p className="capitalize">{user?.role.replace("_", " ")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-4" />
          <div className="capitalize flex items-center gap-2">
            {user?.employment_type.replace("_", " ")}
            <span className="text-secondary-foreground">|</span>
            {user?.work_hours_per_week} hours/week
          </div>
        </div>
      </div>
    </Card>
  );
}
