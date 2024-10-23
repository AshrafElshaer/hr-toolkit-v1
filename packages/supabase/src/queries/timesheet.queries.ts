import { type SupabaseInstance, TimeSheetStatusEnum } from "../types";

export async function getCurrentTimeSheet(
  supabase: SupabaseInstance,
  userId: string,
) {
  return await supabase
    .from("time_sheet")
    .select("*")
    .eq("user_id", userId)
    .eq("status", TimeSheetStatusEnum.clocked_in)
    .single();
}

export async function getCurrentBreaks(
  supabase: SupabaseInstance,
  time_sheet_id: string,
) {
  return await supabase
    .from("time_sheet_break")
    .select("*")
    .eq("time_sheet_id", time_sheet_id);
}

export async function getTimeSheetByDateRange(
  supabase: SupabaseInstance,
  userId: string,
  { startDate, endDate }: { startDate: string; endDate: string },
) {
  return await supabase
    .from("time_sheet")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate);
}
