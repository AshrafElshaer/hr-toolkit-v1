import { attendanceTableFiltersSearchParamsCache } from "@/features/attendance/attendance-table-params";
import { createServerClient } from "@/lib/supabase/server";
import { getFilteredTimeSheets } from "@toolkit/supabase/queries";
import { columns } from "./columns";
import { TimeSheetTable } from "./table";

export async function AttendanceTable({ userId }: { userId: string }) {
  const { status, from, to, page, perPage, sort } =
    attendanceTableFiltersSearchParamsCache.all();

  const supabase = createServerClient();

  const { data, error } = await getFilteredTimeSheets({
    supabase,
    userId,
    filters: { status, perPage, page, sort, startDate: from, endDate: to },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return <TimeSheetTable data={data ?? []} columns={columns} />;
}
