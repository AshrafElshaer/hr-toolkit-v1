import { AttendanceTable } from "@/features/attendance/components/attendance-table";
import { dateRangeSearchParamsCache } from "@/lib/search-params/date-range-search";
import { tableFiltersSearchParamsCache } from "@/lib/search-params/table-filters";
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
  const filters = tableFiltersSearchParamsCache.parse(searchParams);
  const loadingKey = `${filters.status}-${filters.from}-${filters.to}-${filters.page}-${filters.perPage}-${filters.sort}`;
  return (
    <section className="flex-grow flex flex-col gap-4">
      <Suspense fallback={<div>Loading...</div>} key={loadingKey}>
        <AttendanceTable userId={params.employeeId} />
      </Suspense>
    </section>
  );
}
