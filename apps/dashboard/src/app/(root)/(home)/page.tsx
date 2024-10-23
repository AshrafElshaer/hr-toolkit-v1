import Main from "@/components/main";
import { Suspense } from "react";

import {
  ClockInOut,
  ClockInOutSkeleton,
} from "@/features/attendance/components/clock-in-out";
import {
  CalendarListLoading,
  EventsWidget,
} from "@/features/events/components/events-widget";
import { DateSelector } from "@/features/events/components/events-widget/date-selector";
import {
  CurrentProject,
  CurrentProjectLoading,
} from "@/features/projects/components/current-project";
import {
  CurrentTasks,
  TasksLoading,
} from "@/features/projects/components/current-tasks";
import {
  Metrics,
  MetricsLoading,
} from "@/features/user/components/metrics-widget";
import { Notes, NotesLoading } from "@/features/user/components/notes";
import {
  WelcomeMessage,
  WelcomeMessageLoading,
} from "@/features/user/components/welcome";
import { dateRangeSearchParamsCache } from "@/lib/search-params/date-range-search";
import { Card, CardContent } from "@toolkit/ui/card";
import { CalendarCheck } from "lucide-react";
export const metadata = {
  title: "Home",
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};
export default function Page({ searchParams }: Props) {
  dateRangeSearchParamsCache.parse(searchParams);
  const loadingKey = `${searchParams.from ?? ""}-${searchParams.to ?? ""}`;
  return (
    <Main
      mdMaxHeight
      className="space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-rows-[min-content_repeat(3,1fr)] lg:grid-rows-[min-content_repeat(2,1fr)] sm:grid-cols-2 lg:grid-cols-4"
    >
      <Suspense fallback={<WelcomeMessageLoading />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense fallback={<ClockInOutSkeleton />}>
        <ClockInOut />
      </Suspense>

      <Suspense fallback={<EventsWidgetLoading />} key={loadingKey}>
        <EventsWidget />
      </Suspense>
      <Suspense fallback={<NotesLoading />}>
        <Notes />
      </Suspense>

      <Suspense fallback={<TasksLoading />}>
        <CurrentTasks />
      </Suspense>

      <Suspense fallback={<CurrentProjectLoading />}>
        <CurrentProject />
      </Suspense>
      <Suspense fallback={<MetricsLoading />}>
        <Metrics />
      </Suspense>
    </Main>
  );
}

function EventsWidgetLoading() {
  return (
    <Card className="w-full sm:col-span-2 lg:col-span-4 p-2 min-h-[250px] max-h-[290px] md:max-h-fit flex flex-col">
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center ">
        <div className="flex gap-2 items-center">
          <CalendarCheck className="size-4" />
          <span className="font-semibold">Your Schedule</span>
        </div>
        <DateSelector />
      </div>
      <CardContent className="p-0 border flex flex-grow rounded overflow-hidden mt-2">
        <CalendarListLoading />
      </CardContent>
    </Card>
  );
}
