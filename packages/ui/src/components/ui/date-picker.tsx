"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";

import type {
  DayPickerSingleProps,
  SelectSingleEventHandler,
} from "react-day-picker";
import { cn } from "../../utils";
import { Button } from "./button";
import { Calendar, type CalendarProps } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
type DatePickerProps = {
  date: Date;
  onSelect: SelectSingleEventHandler;
  className?: string;
} & DayPickerSingleProps;

export function DatePicker({
  date,
  onSelect,
  className,
  ...props
}: DatePickerProps) {
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
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar selected={date} onSelect={onSelect} initialFocus {...props} />
      </PopoverContent>
    </Popover>
  );
}
