"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format, subYears } from "date-fns";
import * as React from "react";

import type {
  DayPickerSingleProps,
  SelectSingleEventHandler,
} from "react-day-picker";
import { cn } from "../../utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
type DatePickerProps = {
  date: Date;
  onSelect: SelectSingleEventHandler;
  className?: string;
} & Omit<DayPickerSingleProps, "mode">;

export function DateOfBirthPicker({
  date,
  onSelect,
  className,
  ...props
}: DatePickerProps) {
  const [year, setYear] = React.useState<number>(date.getFullYear());
  const [month, setMonth] = React.useState<number>(date.getMonth());
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date of birth</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 z-50 ui-pointer-events-auto"
        align="start"
        // sideOffset={12}
      >
        <div className="flex gap-4 p-2">
          <Select
            onValueChange={(val) => setYear(Number(val))}
            value={year.toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a year" className="mx-auto" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[150px] w-full">
                <SelectGroup>
                  <SelectLabel>Years</SelectLabel>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) => setMonth(Number(val))}
            value={month.toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a month" className="mx-auto" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[150px] w-full">
                <SelectGroup>
                  <SelectLabel>Months</SelectLabel>
                  {monthsOptions.map((month) => (
                    <SelectItem
                      key={month.value}
                      value={month.value.toString()}
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <Calendar
          selected={date}
          onSelect={onSelect}
          initialFocus
          month={new Date(year, month)}
          disableNavigation
          mode="single"
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}

const yearOptions = Array.from(
  { length: 65 },
  (_, i) => Number(subYears(new Date(), 18).getFullYear()) - i,
);
const monthsOptions = [
  { label: "January", value: 0 },
  { label: "February", value: 1 },
  { label: "March", value: 2 },
  { label: "April", value: 3 },
  { label: "May", value: 4 },
  { label: "June", value: 5 },
  { label: "July", value: 6 },
  { label: "August", value: 7 },
  { label: "September", value: 8 },
  { label: "October", value: 9 },
  { label: "November", value: 10 },
  { label: "December", value: 11 },
];
