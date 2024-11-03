import { AttendanceTable } from "@/features/attendance/components/attendance-table";
import { HoursSummary } from "@/features/attendance/components/widgets/hours-summary";
import { HoursBreakdownLoading } from "@/features/attendance/components/widgets/hours-summary/hours-breakdown.loading";
import { attendanceTableFiltersSearchParamsCache } from "@/features/attendance/lib/attendance-table-params";
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
  attendanceTableFiltersSearchParamsCache.parse(searchParams);

  return (
    <section className="flex-grow flex flex-col gap-4">
      <Suspense fallback={<HoursBreakdownLoading />}>
        <HoursSummary userId={params.employeeId} />
      </Suspense>

      <AttendanceTable userId={params.employeeId} />
    </section>
  );
}
