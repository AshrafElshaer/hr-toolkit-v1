"use server";

import { actionClient } from "@/actions/safe-action";
import { resend } from "@/lib/resend";
import { createServerClient } from "@/lib/supabase/server";
import { OtpEmail } from "@v1/email/emails/otp-email";

import { z } from "zod";

export const sendOtpAction = actionClient
  .schema(
    z.object({
      email: z.string().email(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { email } = parsedInput;

    const { data: otpData, error: otpError } = await generateOtpCode({ email });

    if (otpError || !otpData.properties.email_otp) {
      throw new Error(otpError?.message || "Failed to generate OTP code");
    }
    const { data: emailResponse, error: emailError } = await resend.emails.send(
      {
        from: "HR Toolkit <onboarding@hrtoolkit.app>",
        to: [email],
        subject: "HR Toolkit OTP Access",
        react: OtpEmail({
          otpCode: otpData.properties.email_otp,
        }),
      },
    );


    if (emailError || !emailResponse?.id) {
      throw new Error(emailError?.message || "Failed to send OTP email");
    }

    return otpData.user.email;
  });

async function generateOtpCode({ email }: { email: string }) {
  const supabase = createServerClient({
    isAdmin: true,
  });
  return supabase.auth.admin.generateLink({
    email,
    type: "magiclink",
  });
}
