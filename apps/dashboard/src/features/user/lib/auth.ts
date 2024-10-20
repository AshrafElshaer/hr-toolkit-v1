import { createServerClient } from "@/lib/supabase/server";

export async function generateOtpCode({ email }: { email: string }) {
  const supabase = createServerClient({
    isAdmin: true,
  });
  return supabase.auth.admin.generateLink({
    email,
    type: "magiclink",
  });
}

export function checkAuthErrorMessages(message: string) {
    if (message.includes("Token has expired or is invalid")) {
      throw new Error("Invalid or expired pass code");
    }
  
    throw new Error(message);
  }
