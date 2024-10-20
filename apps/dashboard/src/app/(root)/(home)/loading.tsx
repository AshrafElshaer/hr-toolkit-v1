import Main from "@/components/main";
import { ClockInOutSkeleton } from "@/features/attendance/components/clock-in-out/clock-in-out.loading";
import { CalendarListLoading } from "@/features/events/components/events-widget";
import { DateSelector } from "@/features/events/components/events-widget/date-selector";
import { CurrentProjectLoading } from "@/features/projects/components/current-project/curent-project.loading";
import { TasksLoading } from "@/features/projects/components/current-tasks/tasks.loading";
import { MetricsLoading } from "@/features/user/components/metrics-widget/metrics.loading";
import { NotesLoading } from "@/features/user/components/notes/notes.loading";
import { WelcomeMessageLoading } from "@/features/user/components/welcome/welcome.loading";
import { Card, CardContent } from "@toolkit/ui/card";
import { CalendarCheck } from "lucide-react";
import React from "react";

export default function HomeLoading() {
  return (
    <Main
      mdMaxHeight
      className="space-y-4 sm:space-y-0 sm:grid sm:gap-4 sm:grid-rows-[min-content_repeat(3,1fr)] lg:grid-rows-[min-content_repeat(2,1fr)] sm:grid-cols-2 lg:grid-cols-4"
    >
      <WelcomeMessageLoading />
      <ClockInOutSkeleton />
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
      <NotesLoading />
      <TasksLoading />
      <CurrentProjectLoading />
      <MetricsLoading />
    </Main>
  );
}
