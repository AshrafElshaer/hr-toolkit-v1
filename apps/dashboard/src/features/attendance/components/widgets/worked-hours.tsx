import { createServerClient } from "@/lib/supabase/server";
import { getFilteredTimeSheets, getUserById } from "@toolkit/supabase/queries";
import { Card, CardContent, CardHeader } from "@toolkit/ui/card";
import { type ChartConfig, ChartContainer } from "@toolkit/ui/chart";
import { Progress } from "@toolkit/ui/progress";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { attendanceTableFiltersSearchParamsCache } from "../../lib/attendance-table-params";
import { countWorkingDaysInRange } from "../../lib/working-days";
import { HoursChart } from "./hours-chart";

type WorkedHoursWidgetProps = {
  userId: string;

};

export default async function WorkedHoursWidget({
  userId,
}: WorkedHoursWidgetProps) {
  const { from, to, ...rest } = attendanceTableFiltersSearchParamsCache.all();
  const supabase = createServerClient();

  const { data: user } = await getUserById(supabase, userId);

  const { data: timeSheets } = await getFilteredTimeSheets({
    supabase,
    userId,
    filters: {
      startDate: from,
      endDate: to,
      ...rest,
    },
  });

  const workingDays = countWorkingDaysInRange(
    from,
    to,
    user?.working_days_per_week ?? [],
  );

  const totalPlannedHours =
    (workingDays * (user?.work_hours_per_week ?? 0)) /
    (user?.working_days_per_week?.length ?? 1);

  const totalWorkedHours =
    (timeSheets?.reduce(
      (acc, timeSheet) => acc + (timeSheet.total_worked_minutes ?? 0),
      0,
    ) ?? 0) / 60;

  const totalPay = totalWorkedHours * (user?.salary_per_hour ?? 0);
  const overtime = totalWorkedHours - totalPlannedHours;
  const overtimePercentage = (overtime / totalPlannedHours) * 100;
  const progressPercentage = Math.min(
    ((totalWorkedHours - Math.max(overtime, 0)) / totalPlannedHours) * 100,
    100,
  );

  return (
    <Card className="">
      <CardHeader className="font-bold md:pb-0">Hours Summary</CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center gap-4 ">
        <div className="flex sm:flex-col flex-wrap gap-2">
          <div className="flex items-center gap-2 min-w-fit">
            <div className="bg-chart-1 size-3 rounded-sm" />
            <p className="text-sm ">Worked </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-chart-2 size-3 rounded-sm" />
            <p className="text-sm ">Remaining </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-chart-3 size-3 rounded-sm" />
            <p className="text-sm ">Overtime </p>
          </div>
        </div>
        <HoursChart
          workedHours={totalWorkedHours}
          scheduledHours={totalPlannedHours}
        />
      </CardContent>
    </Card>
  );
}
