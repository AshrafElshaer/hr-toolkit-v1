"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type * as React from "react";
import type {
  DateRange,
  DayPickerRangeProps,
  SelectRangeEventHandler,
} from "react-day-picker";

import { cn } from "../../utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type DateRangeOption = {
  title: string;
  range: { from: Date; to: Date };
};

export function DatePickerWithRange({
  className,
  date,
  onSelect,
  numberOfMonths = 2,
  dateRangeOptions,
  align = "center",
  ...props
}: Omit<DayPickerRangeProps, "mode"> &
  React.HTMLAttributes<HTMLDivElement> & {
    date: DateRange | undefined;
    onSelect: (dateRange: DateRange) => void;
    numberOfMonths?: number;
    dateRangeOptions?: DateRangeOption[];
    align?: "center" | "start" | "end";
  }) {
  return (
    <div className={cn("grid gap-2 w-[300px]", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          {dateRangeOptions && dateRangeOptions.length > 0 ? (
            <div className="px-4 py-2">
              <Select
                onValueChange={(value) =>
                  onSelect(
                    dateRangeOptions.find((option) => option.title === value)
                      ?.range || { from: new Date(), to: new Date() },
                  )
                }
                defaultValue={
                  dateRangeOptions?.find(
                    (option) =>
                      option.range?.from === date?.from &&
                      option.range?.to === date?.to,
                  )?.title || ""
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a range option" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option.title} value={option.title}>
                      {option.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}

          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect as SelectRangeEventHandler}
            numberOfMonths={numberOfMonths}
            {...props}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
