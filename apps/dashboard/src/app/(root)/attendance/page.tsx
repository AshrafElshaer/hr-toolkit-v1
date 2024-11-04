import Main from "@/components/main";
import { TimeSheetTable } from "@/features/attendance/components/attendance-table/table";
import { HoursSummary } from "@/features/attendance/components/widgets/hours-summary";
import { HoursBreakdownLoading } from "@/features/attendance/components/widgets/hours-summary/hours-breakdown.loading";
import { attendanceTableFiltersSearchParamsCache } from "@/features/attendance/lib/attendance-table-params";
import { createServerClient } from "@/lib/supabase/server";
import {
  getCurrentUser,
  getFilteredTimeSheets,
} from "@toolkit/supabase/queries";
import type { User } from "@toolkit/supabase/types";
import { Suspense } from "react";
import { columns } from "./columns";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function AttendancePage({ searchParams }: Props) {
  const { from, to, ...rest } =
    attendanceTableFiltersSearchParamsCache.parse(searchParams);
  const supabase = createServerClient();

  const { data: user } = await getCurrentUser(supabase);

  const { data: timeSheets } = await getFilteredTimeSheets({
    supabase,
    userId: user?.id ?? "",
    filters: {
      startDate: from,
      endDate: to,
      ...rest,
    },
  });

  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <Suspense fallback={<HoursBreakdownLoading />}>
        <HoursSummary
          user={user ?? ({} as User)}
          timeSheets={timeSheets ?? []}
          from={from}
          to={to}
        />
      </Suspense>

      <TimeSheetTable
        data={timeSheets ?? []}
        columns={columns}
        isAdmin={false}
      />
    </Main>
  );
}
