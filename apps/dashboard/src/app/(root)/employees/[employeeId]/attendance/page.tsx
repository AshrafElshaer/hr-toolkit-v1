import { AttendanceTable } from "@/features/attendance/components/attendance-table";
import { dateRangeSearchParamsCache } from "@/lib/search-params/date-range-search";

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
  dateRangeSearchParamsCache.parse(searchParams);
  return (
    <section className="flex-grow flex flex-col gap-4">
      <AttendanceTable userId={params.employeeId} />
    </section>
  );
}
