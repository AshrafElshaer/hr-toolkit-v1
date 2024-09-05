import { createServerClient } from "@/lib/supabase/server";
import { getCurrentBreaks, getCurrentTimeSheet, getCurrentUser } from "@v1/supabase/queries";
import React from "react";
import ClockInOutClient from "./clock-in-out.client";
export default async function ClockInOut() {
  const supabase = createServerClient();
  const user = await getCurrentUser(supabase);
  const currentTimeSheet = await getCurrentTimeSheet(user.id);
  const currentBreaks = await getCurrentBreaks(currentTimeSheet?.id);
  return <ClockInOutClient currentTimeSheet={currentTimeSheet} currentBreaks={currentBreaks} />;
}
