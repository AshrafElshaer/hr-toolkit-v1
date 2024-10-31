"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  type Department,
  type TimeSheet,
  TimeSheetStatusEnum,
  type User,
} from "@toolkit/supabase/types";

import { MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/tables/data-table-column-header";

import { Button } from "@toolkit/ui/button";
import { Checkbox } from "@toolkit/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@toolkit/ui/dropdown-menu";
import { Cancel01Icon, PencilEdit01Icon, Tick01Icon } from "hugeicons-react";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { GoDash } from "react-icons/go";
import { toast } from "sonner";
import { approveTimeSheetAction } from "../../lib/attendance.actions";

export interface DepartmentQuery extends Department {
  manager: User | null;
  members: { user_id: string }[];
}

export const columns: ColumnDef<TimeSheet>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "date",
    accessorFn: (row) => row.date,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        className="justify-between min-w-28"
      />
    ),
    cell: ({ row }) => {
      const date = row.original.date;
      return <div>{moment(date).format("ll")}</div>;
    },
  },

  {
    id: "clock_in",
    accessorFn: (row) => row.clock_in,
    header: () => <div className="min-w-16">Clock In</div>,
    cell: ({ row }) => {
      const department = row.original;
      const clockIn = department.clock_in;

      if (!clockIn) return <GoDash />;

      return <div>{moment(clockIn).format("LT")}</div>;
    },
  },
  {
    id: "clock_out",
    accessorFn: (row) => row.clock_out,
    header: () => <div className="min-w-20">Clock Out</div>,
    cell: ({ row }) => {
      const department = row.original;
      const clockOut = department.clock_out;

      if (!clockOut) return <GoDash />;

      return <div>{moment(clockOut).format("LT")}</div>;
    },
  },

  {
    id: "total_worked_minutes",
    accessorFn: (row) => row.total_worked_minutes,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Worked Hours"
        className="justify-center min-w-32"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-semibold ">
          {((row.original.total_worked_minutes ?? 0) / 60).toFixed(2)} hours
        </div>
      );
    },
  },

  {
    id: "status",
    accessorFn: (row) => row.status,
    header: () => <div className="min-w-32">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {row.original.status.replace(/_/g, " ")}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="w-8" />,
    cell: ({ row }) => {
      const timeSheet = row.original;
      const { executeAsync: approveTimeSheet, isExecuting: isApproving } =
        useAction(approveTimeSheetAction);

      async function handleApproveTimeSheet() {
        const isSafeToApprove =
          timeSheet.status !== TimeSheetStatusEnum.clocked_in;
        if (!isSafeToApprove) {
          toast.error("Cannot approve clocked in records!");
          return;
        }

        toast.promise(approveTimeSheet([timeSheet.id]), {
          loading: "Approving record",
          success: "Record approved successfully",
          error: ({ error }) =>
            error?.serverError ?? "Failed to approve record",
        });
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleApproveTimeSheet}>
              <Tick01Icon className="size-4 mr-2" strokeWidth={2} />
              Approve
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Cancel01Icon className="size-4 mr-2" strokeWidth={2} />
              Reject
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PencilEdit01Icon className="size-4 mr-2" strokeWidth={2} />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
