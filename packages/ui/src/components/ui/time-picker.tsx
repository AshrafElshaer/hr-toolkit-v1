// Dependencies: npm install react-aria-components

"use client";

import {
  DateInput,
  DateSegment,
  Label,
  TimeField,
  type TimeFieldProps,
  type TimeValue,
} from "react-aria-components";

export function TimePicker({
  value,
  onChange,
  ...props
}: TimeFieldProps<TimeValue>) {
  return (
    <TimeField onChange={onChange} value={value} aria-label="Time" {...props}>
      <DateInput className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border  bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
        {(segment) => (
          <DateSegment
            segment={segment}
            className="inline rounded p-0.5 text-foreground caret-transparent outline-none focus:bg-accent focus:text-accent-foreground data-[placeholder]:text-muted-foreground/70 data-[segment=literal]:text-muted-foreground"
          />
        )}
      </DateInput>
    </TimeField>
  );
}
