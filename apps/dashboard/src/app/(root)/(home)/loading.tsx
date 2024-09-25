import Main from "@/components/main";
import { Card, CardContent } from "@toolkit/ui/card";
import { CalendarCheck } from "lucide-react";
import React from "react";
import { ClockInOutSkeleton } from "./components/clock-in-out/clock-in-out.loading";
import CurrentProjectLoading from "./components/current-project/curent-project.loading";
import TasksLoading from "./components/current-tasks/tasks.loading";
import { CalendarListLoading } from "./components/events";
import DateSelector from "./components/events/date-selector";
import MetricsLoading from "./components/metrics/metrics.loading";
import NotesLoading from "./components/notes/notes.loading";
import { WelcomeMessageLoading } from "./components/welcome/welcome.loading";

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
