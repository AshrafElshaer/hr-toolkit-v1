import { columns } from "@/features/attendance/components/attendance-table/columns";
import { TimeSheetTable } from "@/features/attendance/components/attendance-table/table";
import { HoursSummary } from "@/features/attendance/components/widgets/hours-summary";
import { HoursBreakdownLoading } from "@/features/attendance/components/widgets/hours-summary/hours-breakdown.loading";
import { attendanceTableFiltersSearchParamsCache } from "@/features/attendance/lib/attendance-table-params";
import { createServerClient } from "@/lib/supabase/server";
import { getFilteredTimeSheets, getUserById } from "@toolkit/supabase/queries";
import type { User } from "@toolkit/supabase/types";
import { Suspense } from "react";

type Props = {
  params: {
    employeeId: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function EmployeeAttendancePage({
  params,
  searchParams,
}: Props) {
  const { from, to, ...rest } =
    attendanceTableFiltersSearchParamsCache.parse(searchParams);

  const supabase = createServerClient();

  const { data: user } = await getUserById(supabase, params.employeeId);

  const { data: timeSheets } = await getFilteredTimeSheets({
    supabase,
    userId: params.employeeId,
    filters: {
      startDate: from,
      endDate: to,
      ...rest,
    },
  });

  return (
    <section className="flex-grow flex flex-col gap-4">
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
        isAdmin={true}
      />
    </section>
  );
}
