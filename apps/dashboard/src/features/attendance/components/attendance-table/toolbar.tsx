"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "@toolkit/ui/button";

import { MdSignalWifiStatusbarConnectedNoInternet2 } from "react-icons/md";

import { DateRangeQuerySelector } from "@/components/data-range-quey";
import { DataTableFacetedFilter } from "@/components/tables/data-table-faceted-filter";
import type { DateRangeOption } from "@/types";
import { type TimeSheet, TimeSheetStatusEnum } from "@toolkit/supabase/types";
import { Cancel01Icon, Tick01Icon } from "hugeicons-react";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useMemo } from "react";
import { toast } from "sonner";
import { approveTimeSheetAction } from "../../lib/attendance.actions";
import { statuses } from "./filters";
import { AttendanceNote } from "./rejection-note";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  isAdmin?: boolean;
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
  isAdmin = false,
}: DataTableToolbarProps<TData>) {
  const selectedRows = useMemo(() => {
    return table.getSelectedRowModel().rows.map((row) => row.original);
  }, [table.getSelectedRowModel().rows]);

  const { executeAsync: approveTimeSheet, isExecuting: isApproving } =
    useAction(approveTimeSheetAction);

  const rowsIds = useMemo(() => {
    return selectedRows.map((row) => (row as TimeSheet).id);
  }, [selectedRows]);

  async function handleApproveTimeSheet() {
    const isSafeToApprove = selectedRows.every(
      (row) => (row as TimeSheet).status !== TimeSheetStatusEnum.clocked_in,
    );
    if (!isSafeToApprove) {
      toast.error("Cannot approve clocked in records!");
      return;
    }

    toast.promise(approveTimeSheet(rowsIds), {
      loading: `Approving ${selectedRows.length} record${selectedRows.length > 1 ? "s" : ""}`,
      success: "Records approved successfully",
      error: ({ error }) => error?.serverError ?? "Failed to approve record",
    });
  }

  return (
    <section className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-start  w-full">
      <div className="flex items-center justify-between space-x-2 w-full   overflow-x-scroll scrollbar-hide">
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses ?? []}
            isMultiSelect={true}
            triggerIcon={
              <MdSignalWifiStatusbarConnectedNoInternet2 className="size-4 mr-2" />
            }
            containerClassName="min-w-[250px]"
          />
        )}
        {selectedRows.length > 0 && isAdmin && (
          <div className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/[0.04] rtl:space-x-reverse">
            <Button
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 px-2"
              variant="success"
              size="sm"
              onClick={handleApproveTimeSheet}
              disabled={isApproving}
            >
              <Tick01Icon className="size-5" strokeWidth={2} />
            </Button>

            <Button
              className="rounded-none text-base shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 pointer-events-none bg-secondary border-x-0"
              variant="outline"
              size="sm"
              disabled={isApproving}
            >
              {selectedRows.length}
            </Button>
            <AttendanceNote notesId={rowsIds}>
              <Button
                className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 px-2"
                variant="destructive"
                size="sm"
                disabled={isApproving}
              >
                <Cancel01Icon className="size-4" strokeWidth={2} />
              </Button>
            </AttendanceNote>
          </div>
        )}
      </div>
      <DateRangeQuerySelector
        options={dateRangeOptions}
        className="ml-auto w-[21rem]"
      />
    </section>
  );
}
