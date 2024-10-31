import { AttendanceTable } from "@/features/attendance/components/attendance-table";
import { HoursSummary } from "@/features/attendance/components/widgets/hours-summary";
import { attendanceTableFiltersSearchParamsCache } from "@/features/attendance/lib/attendance-table-params";

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
      <HoursSummary userId={params.employeeId} />

      <AttendanceTable userId={params.employeeId} />
    </section>
  );
}
