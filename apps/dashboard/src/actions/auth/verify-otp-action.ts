"use server";

import { actionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { z } from "zod";

export const verifyOtpAction = actionClient
  .schema(
    z.object({
      otpCode: z.string(),
      email: z.string(),
      redirectTo: z.string().nullable(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { email, otpCode, redirectTo } = parsedInput;
    const supabase = createServerClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "magiclink",
    });
    if (error) {
      checkErrorMessages(error.message);
    }

    const organizationId = data.user?.user_metadata.organization_id as string;

    if (!organizationId) {
      redirect("/onboarding");
    }
    if (data.session && data.user) {
      redirect(redirectTo ?? "/");
    }
  });

function checkErrorMessages(message: string) {
  if (message.includes("Token has expired or is invalid")) {
    throw new Error("Invalid or expired pass code");
  }

  throw new Error(message);
}
