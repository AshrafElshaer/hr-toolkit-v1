import { AttendanceTable } from "@/features/attendance/components/attendance-table";
import WorkedHoursWidget from "@/features/attendance/components/widgets/worked-hours";
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
  const { from, to } =
    attendanceTableFiltersSearchParamsCache.parse(searchParams);

  return (
    <section className="flex-grow flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WorkedHoursWidget userId={params.employeeId} from={from} to={to} />
        <div>
          time off 
        </div>
       
      </div>
        <AttendanceTable userId={params.employeeId} />
    </section>
  );
}
