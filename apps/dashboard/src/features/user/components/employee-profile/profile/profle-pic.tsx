"use client";

import UploadZone from "@/components/upload-zone";
import { updateUserByIdAction } from "@/features/user/actions/users.actions";
import { useSupabase } from "@/hooks/use-supabase";
import { uploadUserAvatar } from "@/lib/supabase/storage/upload";
import type { User } from "@toolkit/supabase/types";
import { Avatar } from "@toolkit/ui/avatar";
import { useRouter } from "next/navigation";
import type { FileRejection } from "react-dropzone";
import { toast } from "sonner";

type ProfilePicProps = {
  user: User;
};

export default function ProfilePic({ user }: ProfilePicProps) {
  const supabase = useSupabase();
  const router = useRouter();

  const onDrop = async (acceptedFiles: File[]) => {
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

  const onDropRejected = (files: FileRejection[]) => {
    toast.error("Please upload a valid image file");
  };

  return (
    <UploadZone
      className="mx-auto size-20 rounded-full p-0"
      options={{
        onDrop,
        onDropRejected,
        accept: { "image/*": [".png", ".jpg", ".jpeg"] },
        maxFiles: 1,
      }}
    >
      <Avatar
        src={user?.avatar_url}
        initials={
          user?.avatar_url
            ? undefined
            : `${user?.first_name[0]}${user?.last_name[0]}`
        }
        className="w-full h-full"
        shape="circle"
      />
    </UploadZone>
  );
}
