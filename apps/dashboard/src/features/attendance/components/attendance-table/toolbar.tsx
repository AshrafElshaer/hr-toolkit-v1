"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "@toolkit/ui/button";
import { Input } from "@toolkit/ui/input";

import { PlusIcon, Search } from "lucide-react";

import { DateRangeQuerySelector } from "@/components/data-range-quey";
import type { DateRangeOption } from "@/types";
import moment from "moment";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const dateRangeOptions: DateRangeOption[] = [
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
    title: "This Month",
    range: {
      from: moment().startOf("month").toDate(),
      to: moment().endOf("month").toDate(),
    },
  },
  {
    title: "Last Month",
    range: {
      from: moment().subtract(1, "month").startOf("month").toDate(),
      to: moment().subtract(1, "month").endOf("month").toDate(),
    },
  },
 
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <section className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-start  w-full">
      <DateRangeQuerySelector
        options={dateRangeOptions}
        className="ml-auto w-fit"
      />
    </section>
  );
}
