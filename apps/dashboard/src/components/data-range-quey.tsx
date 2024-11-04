"use client";
import { dateRangeSearchParamsParser } from "@/lib/search-params/date-range-search";
import type { DateRangeOption } from "@/types";
import { Button } from "@toolkit/ui/button";
import { cn } from "@toolkit/ui/cn";
import { DatePickerWithRange } from "@toolkit/ui/date-range-picker";
import { PlusIcon } from "lucide-react";
import moment from "moment";
import { parseAsString, useQueryStates } from "nuqs";
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
type Props = {
  options?: DateRangeOption[];
  className?: string;
  disabled?: boolean;
};
export function DateRangeQuerySelector({
  options = dateRangeOptions,
  className,
  disabled = false,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [{ from, to }, setDate] = useQueryStates(dateRangeSearchParamsParser, {
    shallow: false,
  });

  const date = {
    from: moment(from).toDate(),
    to: moment(to).toDate(),
  };

  return (
    <DatePickerWithRange
      className={cn("w-full ", className)}
      date={date}
      align="end"
      numberOfMonths={isMobile ? 1 : 2}
      dateRangeOptions={options}
      disabled={disabled}
      onSelect={(value) => {
        const date = value as DateRange;
        if (date) {
          !date.from &&
            setDate({ from: moment().startOf("month").format("YYYY-MM-DD") });
          !date.to &&
            setDate({ to: moment().endOf("month").format("YYYY-MM-DD") });

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
  );
}
