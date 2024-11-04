import { createServerClient } from "@/lib/supabase/server";
import { getFilteredTimeSheets, getUserById } from "@toolkit/supabase/queries";
import { Card, CardContent, CardHeader } from "@toolkit/ui/card";
import { Separator } from "@toolkit/ui/separator";

import { attendanceTableFiltersSearchParamsCache } from "@/features/attendance/lib/attendance-table-params";
import { countWorkingDaysInRange } from "@/features/attendance/lib/working-days";
import type { TimeSheet, User } from "@toolkit/supabase/types";
import { HoursBreakdown } from "./hours-breakdown";

type WorkedHoursWidgetProps = {
  user: User;
  timeSheets: TimeSheet[];
  from: string;
  to: string;
};

export async function HoursSummary({
  user,
  timeSheets,
  from,
  to,
}: WorkedHoursWidgetProps) {
  const workingDays = countWorkingDaysInRange(
    from,
    to,
    user?.working_days_per_week ?? [],
  );

  const totalScheduledHours =
    (workingDays * (user?.work_hours_per_week ?? 0)) /
    (user?.working_days_per_week?.length ?? 1);

  const totalWorkedHours =
    (timeSheets?.reduce(
      (acc, timeSheet) => acc + (timeSheet.total_worked_minutes ?? 0),
      0,
    ) ?? 0) / 60;

  const overtime = Math.max(totalWorkedHours - totalScheduledHours, 0);

  return (
    <Card className="flex flex-col items-start p-0 sm:flex-row">
      <CardHeader className="font-bold min-w-fit p-4">Hours Summary</CardHeader>
      <div className="w-full sm:w-[1px] sm:self-stretch">
        <Separator orientation="horizontal" className="w-full sm:hidden" />
        <Separator orientation="vertical" className="hidden sm:block h-full" />
      </div>
      <CardContent className="flex flex-row flex-wrap items-start justify-between gap-4 p-4 w-full">
        <HoursBreakdown
          totalScheduledHours={totalScheduledHours}
          totalWorkedHours={totalWorkedHours}
          overtime={overtime}
        />
      </CardContent>
    </Card>
  );
}
