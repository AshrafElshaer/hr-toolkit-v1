import { dateRangeSearchParamsCache } from "@/lib/search-params/date-range-search";
import { createServerClient } from "@/lib/supabase/server";
import { getTimeSheetByDateRange } from "@toolkit/supabase/queries";
import { columns } from "./columns";
import { TimeSheetTable } from "./table";

export async function AttendanceTable({ userId }: { userId: string }) {
  const supabase = createServerClient();
  const { from, to } = dateRangeSearchParamsCache.all();
  const { data, error } = await getTimeSheetByDateRange(supabase, userId, {
    startDate: from,
    endDate: to,
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return <TimeSheetTable data={data ?? []} columns={columns} />;
}
