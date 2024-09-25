import { render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { renderAccountDeletionsNotice } from "@toolkit/email/account-deletions-notice";
import { envvars, logger, task } from "@trigger.dev/sdk/v3";
import React from "react";
import { Resend } from "resend";

export const accountDeletionsNotice = task({
  id: "account-deletions-notice",
  run: async (payload: { id: string }, { ctx }) => {
    const userId = payload.id;
    const SUPABASE_URL = await envvars.retrieve("SUPABASE_URL");
    const SUPABASE_SERVICE_KEY = await envvars.retrieve("SUPABASE_SERVICE_KEY");
    const RESEND_API_KEY = await envvars.retrieve("RESEND_API_KEY");
    const resend = new Resend(RESEND_API_KEY.value);
    const supabase = createClient(
      SUPABASE_URL.value,
      SUPABASE_SERVICE_KEY.value,
    );

    const { data: authUser, error: authUserError } =
      await supabase.auth.admin.getUserById(userId);

    if (authUserError) {
      logger.error("Error getting user", { authUserError });
      throw authUserError;
    }

    if (authUser.user.email_confirmed_at) {
      logger.info("User already confirmed", { userId });
      return;
    }

    const email = authUser.user.email;

    if (email) {
      const emailHtml = await renderAccountDeletionsNotice;
      try {
        await resend.emails.send({
          from: "HR Toolkit Accounts <noreply@hrtoolkit.app>",
          to: email,
          subject: "Account Deletion Notice",
          html: emailHtml,
        });
        logger.info("Account deletion notice email sent", { email });
      } catch (emailError) {
        logger.error("Error sending account deletion notice email", {
          emailError,
        });
      }
    }

    logger.info("Account deletion notice sent successfully", { userId });
  },
});
