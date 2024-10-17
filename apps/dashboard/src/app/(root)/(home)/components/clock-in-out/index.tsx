import { createServerClient } from "@/lib/supabase/server";
import {
  getCurrentBreaks,
  getCurrentTimeSheet,
  getCurrentUser,
} from "@toolkit/supabase/queries";
import React from "react";
import ClockInOutClient from "./clock-in-out.client";
export default async function ClockInOut() {
  const supabase = createServerClient();
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError) {
    return <div>Error: {authError.message}</div>;
  }
  const { data: currentTimeSheet, error: currentTimeSheetError } =
    await getCurrentTimeSheet(supabase, auth.user.id);
  const { data: currentBreaks, error: currentBreaksError } =
    currentTimeSheet?.id
      ? await getCurrentBreaks(supabase, currentTimeSheet.id)
      : { data: [], error: null };
  return (
    <ClockInOutClient
      currentTimeSheet={currentTimeSheet}
      currentBreaks={currentBreaks}
    />
  );
}
