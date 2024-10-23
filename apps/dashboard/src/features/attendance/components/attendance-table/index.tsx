import { dateRangeSearchParamsCache } from "@/lib/search-params/date-range-search";
import { tableFiltersSearchParamsCache } from "@/lib/search-params/table-filters";
import { createServerClient } from "@/lib/supabase/server";
import { getTimeSheetByDateRange } from "@toolkit/supabase/queries";
import { columns } from "./columns";
import { TimeSheetTable } from "./table";

export async function AttendanceTable({ userId }: { userId: string }) {
  const { status, from, to, page, perPage, sort } =
    tableFiltersSearchParamsCache.all();

  const supabase = createServerClient();

  const { data, error } = await getTimeSheetByDateRange(
    supabase,
    userId,
    {
      startDate: from,
      endDate: to,
    },
    { status, perPage, page, sort },
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  return <TimeSheetTable data={data ?? []} columns={columns} />;
}
