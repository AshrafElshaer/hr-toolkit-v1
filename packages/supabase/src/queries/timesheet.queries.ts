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
  filters: { status: string[]; perPage: number; page: number; sort: string },
) {
  const query = supabase.from("time_sheet").select("*").eq("user_id", userId);

  if (startDate && endDate) {
    query.gte("date", startDate).lte("date", endDate);
  }

  if (filters.status.length > 0) {
    query.in("status", filters.status);
  }

  query.range(
    filters.perPage * (filters.page - 1),
    filters.perPage * filters.page,
  );
  if (filters.sort) {
    const [column, direction] = filters.sort.split(".");
    if (column && direction) {
      query.order(column, {
        ascending: direction === "asc",
      });
    }
  }

  return await query;
}
