import { createClient } from "@/lib/supabase/client";

type UploadProps = {
  path: string;
  file: File;
  bucket: string;
};

export async function uploadFile({ path, file, bucket }: UploadProps) {
  const supabase = createClient({ isAdmin: true });
  return await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600000000",
    upsert: true,
  });
}

export async function uploadUserAvatar(userId: string, file: File) {
  return uploadFile({ path: userId, file, bucket: "avatars" });
}
