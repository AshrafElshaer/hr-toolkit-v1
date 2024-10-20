"use server";

import { resend } from "@/lib/resend";
import { actionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { OtpEmail } from "@toolkit/email/otp-email";
import { redirect } from "next/navigation";

import { z } from "zod";
import { checkAuthErrorMessages, generateOtpCode } from "../lib/auth";

export const sendOtpAction = actionClient
  .schema(
    z.object({
      email: z.string().email(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;

    const { data: otpData, error: otpError } = await generateOtpCode({ email });

    if (otpError || !otpData.properties.email_otp) {
      throw new Error(otpError?.message || "Failed to generate OTP code");
    }
    const { data: emailResponse, error: emailError } = await resend.emails.send(
      {
        from: "HR Toolkit Access <onboarding@hrtoolkit.app>",
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
      checkAuthErrorMessages(error.message);
    }

    const organizationId = data.user?.user_metadata.organization_id as string;

    if (!organizationId) {
      redirect("/onboarding");
    }
    if (data.session && data.user) {
      redirect(redirectTo ?? "/");
    }
  });
