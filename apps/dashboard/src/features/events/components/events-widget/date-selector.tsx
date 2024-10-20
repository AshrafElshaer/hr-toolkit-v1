"use client";
import type { DateRangeOption } from "@/types";
import { Button } from "@toolkit/ui/button";
import { DatePickerWithRange } from "@toolkit/ui/date-range-picker";
import { PlusIcon } from "lucide-react";
import moment from "moment";
import { useQueryStates } from "nuqs";
import React from "react";
import type { DateRange } from "react-day-picker";
import { useMediaQuery } from "usehooks-ts";
import { eventsSearchParamsParser } from "../../lib/events-search-params";
// import EventForm from "./event-form";

const dateRangeOptions: DateRangeOption[] = [
  {
    title: "Next 7 Days",
    range: {
      from: moment().toDate(),
      to: moment().add(6, "days").toDate(),
    },
  },
  {
    title: "This Week",
    range: {
      from: moment().startOf("week").toDate(),
      to: moment().endOf("week").toDate(),
    },
  },
  {
    title: "Last Week",
    range: {
      from: moment().subtract(1, "week").startOf("week").toDate(),
      to: moment().subtract(1, "week").endOf("week").toDate(),
    },
  },
  {
    title: "Next Week",
    range: {
      from: moment().add(1, "week").startOf("week").toDate(),
      to: moment().add(1, "week").endOf("week").toDate(),
    },
  },
];

export  function DateSelector() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [isNewEvent, setIsNewEvent] = React.useState(false);

  const [{ from, to }, setDate] = useQueryStates(eventsSearchParamsParser, {
    shallow: false,
  });

  const date = {
    from: from.length > 0 ? moment(from).toDate() : undefined,
    to: to.length > 0 ? moment(to).toDate() : undefined,
  };

  return (
    <div className="flex gap-2 items-center ml-auto">
      <DatePickerWithRange
        className="w-fit "
        date={date}
        align="end"
        numberOfMonths={isMobile ? 1 : 2}
        dateRangeOptions={dateRangeOptions}
        onSelect={(value) => {
          const date = value as DateRange;
          if (date) {
            !date.from && setDate({ from: "" });
            !date.to && setDate({ to: "" });

            date.from &&
              setDate({
                from: moment(date.from).format("YYYY-MM-DD"),
              });
            date.to &&
              setDate({
                to: moment(date.to).format("YYYY-MM-DD"),
              });
          }
        }}
      />

      {/* <EventForm isOpen={isNewEvent} setIsOpen={setIsNewEvent}>
				<Button size="icon" variant="secondary">
					<PlusIcon className="size-4" />
				</Button>
			</EventForm> */}
    </div>
  );
}
