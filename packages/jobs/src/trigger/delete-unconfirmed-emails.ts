import { render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { envvars, logger, task } from "@trigger.dev/sdk/v3";
import { UnconfirmedDeletionEmail } from "@v1/email/unconfirmed-deletion-email";
import React from "react";
import { Resend } from "resend";

export const deleteUnconfirmedEmails = task({
  id: "delete-unconfirmed-emails",
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

    const { data, error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      logger.error("Error deleting user", { error });
      throw error;
    }

    const email = data.user.email;

    if (email) {
      const emailHtml = await render(
        React.createElement(UnconfirmedDeletionEmail),
      );
      try {
        await resend.emails.send({
          from: "HR Toolkit Accounts <noreply@hrtoolkit.app>",
          to: email,
          subject: "Account Deletion Confirmation",
          html: emailHtml,
        });
        logger.info("Deletion confirmation email sent", { email });
      } catch (emailError) {
        logger.error("Error sending deletion confirmation email", {
          emailError,
        });
      }
    }

    logger.info("User deleted successfully", { userId });
  },
});
