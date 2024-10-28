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
type GetTimeSheetByDateRangeFilters = {
  supabase: SupabaseInstance;
  userId: string;
  filters: {
    status?: string[];
    perPage?: number;
    page?: number;
    sort?: string;
    startDate?: string;
    endDate?: string;
  };
};
export async function getFilteredTimeSheets({
  supabase,
  userId,
  filters,
}: GetTimeSheetByDateRangeFilters) {
  const query = supabase.from("time_sheet").select("*").eq("user_id", userId);

  if (filters.startDate && filters.endDate) {
    query.gte("date", filters.startDate).lte("date", filters.endDate);
  }

  if (filters.status && filters.status.length > 0) {
    query.in("status", filters.status);
  }

  if (filters.perPage && filters.page) {
    query.range(
      filters.perPage * (filters.page - 1),
      filters.perPage * filters.page,
    );
  }
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
