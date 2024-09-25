import { createServerClient } from "@/lib/supabase/server";
// import type { EventWithOrganizerAndDepartment } from "@v1/supabase/types";
import { ScrollArea } from "@toolkit/ui/scroll-area";
import { Separator } from "@toolkit/ui/separator";
import { differenceInCalendarDays } from "date-fns";
import moment from "moment";
import React from "react";
import { LuCalendarX } from "react-icons/lu";
import { eventsSearchParamsCache } from "./events-search-params";
// import { getEventsByDateRange } from "@v1/supabase/events-queries";
// import EventCard from "./event-card";

export default async function EventsList() {
  const selectedDates = eventsSearchParamsCache.all();
  const supabase = createServerClient();
  // const { data } = await getEventsByDateRange(supabase, {
  // 	from: selectedDates.from,
  // 	to: selectedDates.to,
  // });

  const datesColumns = getDatesInBetween(
    new Date(selectedDates.from),
    new Date(selectedDates.to),
  );

  const events = {};
  // (data as unknown as EventWithOrganizerAndDepartment[])?.reduce(
  // 	(acc, event) => {
  // 		const date = event.date;
  // 		if (!acc[date]) {
  // 			acc[date] = [];
  // 		}
  // 		acc[date].push(event);

  // 		// Sort the events by start time and end time within each date
  // 		acc[date].sort((a, b) => {
  // 			const startTimeComparison = a.start_time.localeCompare(b.start_time);
  // 			if (startTimeComparison !== 0) {
  // 				return startTimeComparison;
  // 			}
  // 			// If start times are equal, compare by end time
  // 			return a.end_time.localeCompare(b.end_time);
  // 		});

  // 		return acc;
  // 	},
  // 	{} as Record<string, EventWithOrganizerAndDepartment[]>,
  // ) || {};

  return (
    <div className="w-full flex divide-x h-full overflow-y-hidden overflow-x-scroll scrollbar-hide">
      {datesColumns.map((date) => (
        <div key={date} className="flex-1 min-w-44 flex flex-col">
          <h3 className="text-center py-2 bg-secondary font-medium">
            {moment(date).format("ddd , DD MMM")}
          </h3>
          <Separator className="w-full" />
          <ScrollArea className="p-2 h-full ">
            {Array.from({ length: 15 }, (_, idx) => {
              return <p key={idx.toString()}>list</p>;
            })}
            {/* {!events[date] ? (
              <div className="text-center h-full flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm">
                <LuCalendarX size={44} />
                <p>
                  No events found!
                  <br />
                  You're free this day
                </p>
              </div>
            ) : (
              events[date].map((event) => (
                // <EventCard key={event.id} event={event} />
                <p>{event.id}</p>
              ))
            )} */}
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}

function getDatesInBetween(from: Date, to: Date) {
  const diff = differenceInCalendarDays(to, from);
  const dates = Array.from({ length: diff + 1 }, (_, idx) => {
    return moment(from).add(idx, "day").format("YYYY-MM-DD");
  });
  return dates;
}
