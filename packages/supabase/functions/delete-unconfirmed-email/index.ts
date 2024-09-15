import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { tasks } from "npm:@trigger.dev/sdk@3.0.0-beta.56/v3";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { Webhook } from "standardwebhooks";
import type { accountDeletionsNotice } from "../../../jobs/src/trigger/account-deletion-notice.ts";
import type { deleteUnconfirmedEmails } from "../../../jobs/src/trigger/delete-unconfirmed-emails.ts";

const hookSecret = Deno.env.get("WEBHOOK_SECRET") as string;

type InsertPayload = {
  type: "INSERT";
  table: string;
  schema: string;
  record: SupabaseUser;
  old_record: null;
};

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("not allowed", { status: 400 });
  }

  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);
  const wh = new Webhook(hookSecret);

  const {
    record: { id },
  } = wh.verify(payload, headers) as InsertPayload;

  const triggerPayload = {
    id,
  };

  await tasks.trigger<typeof accountDeletionsNotice>(
    "account-deletions-notice",
    triggerPayload,
    {
      delay: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days
    },
  );

  await tasks.trigger<typeof deleteUnconfirmedEmails>(
    "delete-unconfirmed-emails",
    triggerPayload,
    {
      delay: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    },
  );

  const responseHeaders = new Headers();
  responseHeaders.set("Content-Type", "application/json");

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: responseHeaders,
  });
});
