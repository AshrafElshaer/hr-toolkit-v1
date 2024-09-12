import { getCurrentUserAction } from "@/actions/user";
import { createClient } from "@/lib/supabase/client";
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

const onUpload = async (file: File) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }
  const promise = supabase.storage
    .from("note-images")
    .upload(`${user.id}/${file.name}-${Date.now()}`, file, {
      cacheControl: "3600000000",
      upsert: false,
    });

  return new Promise((resolve) => {
    toast.promise(
      promise.then(async (res) => {
        // Successfully uploaded image
        if (!res.error) {
          const { data } = await supabase.storage
            .from("note-images")
            .getPublicUrl(res.data.path);
          const { publicUrl: url } = data;

          // preload the image
          const image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
          // No blob store configured
        } else if (res.error) {
          resolve(file);
          throw new Error(res.error.message);
          // Unknown error
        } else {
          throw new Error("Error uploading image. Please try again.");
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => e.message,
      },
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
