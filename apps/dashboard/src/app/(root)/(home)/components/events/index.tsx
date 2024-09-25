import { Card, CardContent } from "@toolkit/ui/card";
import { Separator } from "@toolkit/ui/separator";
import { Skeleton } from "@toolkit/ui/skeleton";
import { CalendarCheck } from "lucide-react";
import React, { Suspense } from "react";
import DateSelector from "./date-selector";
import EventsList from "./events-list";

export default async function Events() {
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
        <Suspense fallback={<CalendarListLoading />}>
          <EventsList />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export function CalendarListLoading() {
  return (
    <div className="w-full flex divide-x h-full overflow-y-hidden overflow-x-scroll scrollbar-hide">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index.toString()} className="flex-1 min-w-44">
          <Skeleton className="h-8 w-full rounded-none" />
          <Separator className="w-full" />
          <div className="p-2 h-[11.65rem]">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
