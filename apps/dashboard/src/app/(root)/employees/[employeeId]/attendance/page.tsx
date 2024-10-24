import { attendanceTableFiltersSearchParamsCache } from "@/features/attendance/attendance-table-params";
import { AttendanceTable } from "@/features/attendance/components/attendance-table";

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
      <AttendanceTable userId={params.employeeId} />
    </section>
  );
}
