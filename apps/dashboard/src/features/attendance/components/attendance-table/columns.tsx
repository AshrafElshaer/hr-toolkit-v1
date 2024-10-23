"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type {
  Department,
  DepartmentMember,
  GetOrganizationMembersQuery,
  TimeSheet,
  User,
} from "@toolkit/supabase/types";

import { ChevronRight, MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/tables/data-table-column-header";
import { Avatar, AvatarGroup } from "@toolkit/ui/avatar";
import { Badge } from "@toolkit/ui/badge";
import { Button } from "@toolkit/ui/button";
import moment from "moment";
import { GoDash } from "react-icons/go";

export interface DepartmentQuery extends Department {
  manager: User | null;
  members: { user_id: string }[];
}

export const columns: ColumnDef<TimeSheet>[] = [
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
    id: "total_worked_hours",
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

  // {
  //   id: "actions",
  //   header: () => <div className="w-8" />,
  //   cell: () => {
  //     return (
  //       <div className="grid place-items-center h-full w-full">
  //         <ChevronRight className="h-4 w-4" />
  //       </div>
  //     );
  //   },
  // },
];
