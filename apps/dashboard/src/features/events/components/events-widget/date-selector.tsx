"use client";
import { DateRangeQuerySelector } from "@/components/data-range-quey";
import { dateRangeSearchParamsParser } from "@/lib/search-params/date-range-search";
import type { DateRangeOption } from "@/types";
import { Button } from "@toolkit/ui/button";
import { DatePickerWithRange } from "@toolkit/ui/date-range-picker";
import { PlusIcon } from "lucide-react";
import moment from "moment";
import { useQueryStates } from "nuqs";
import React from "react";
import type { DateRange } from "react-day-picker";
import { useMediaQuery } from "usehooks-ts";
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

export function DateSelector() {
  const [isNewEvent, setIsNewEvent] = React.useState(false);

  return (
    <div className="flex gap-2 items-center ml-auto ">
      <DateRangeQuerySelector className="w-fit" options={dateRangeOptions} />
    </div>
  );
}
