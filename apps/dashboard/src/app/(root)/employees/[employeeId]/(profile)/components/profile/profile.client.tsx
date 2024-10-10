"use client";
import UploadZone from "@/components/upload-zone";
import { useSupabase } from "@/hooks/use-supabase";
import type { User } from "@toolkit/supabase/types";
import { Avatar } from "@toolkit/ui/avatar";
import { Badge } from "@toolkit/ui/badge";
import { Card } from "@toolkit/ui/card";
import { Separator } from "@toolkit/ui/separator";
import { Cake, Calendar, KeyRound, Mail, Phone, Play } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function ProfileClient({ user }: { user: User }) {
  const supabase = createClient({ isAdmin: true });

  const onImageDrop = async (acceptedFiles: File[]) => {
    toast.info("Uploading image...");
    const file = acceptedFiles[0];
    const { error, data } = await supabase.storage.listBuckets();
    //   .from("avatars")
    //   .upload(user.id, file, {
    //     cacheControl: "3600000000",
    //     upsert: true,
    //   });
    console.log({ data, error });
    if (error || !data) {
      toast.error("Error uploading image");
      return;
    }

    // const {
    //   data: { publicUrl },
    // } = supabase.storage.from("avatars").getPublicUrl(data.path);
    // console.log({ publicUrl });
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
          initials={`${user?.first_name[0]}${user?.last_name[0]}`}
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
      <Separator className="w-full" />

      <h3 className="font-bold px-2">Personal Information</h3>
      <div className="space-y-2 text-sm px-4 text-accent-foreground">
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
        {/* <div className="flex items-center gap-2">
        <KeyRound className="size-4" />
        <p className="capitalize">{user?.role.replace("_", " ")}</p>
      </div> */}
      </div>
    </Card>
  );
}
