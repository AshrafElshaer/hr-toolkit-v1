"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";

import { ChevronRight, MoreHorizontal } from "lucide-react";

import { Badge } from "@toolkit/ui/badge";
import { Button } from "@toolkit/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@toolkit/ui/dropdown-menu";
export const columns: ColumnDef<GetOrganizationMembersQuery>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.user?.first_name} ${row.user?.last_name}`,
    header: () => <div className="min-w-24">Name</div>,
  },
  {
    id: "email",
    accessorFn: (row) => row.user?.email,
    header: () => <div className="min-w-40">Email</div>,
  },
  {
    id: "department",
    accessorFn: (row) =>
      `${row.department?.name} - ${row.department?.description}`,
    header: () => <div className="min-w-40">Department</div>,
  },
  {
    id: "job_title",
    accessorFn: (row) => row.user?.job_title,
    header: () => <div className="min-w-32">Job Title</div>,
    // cell: ({ row }) => {
    //   const employee = row.original;
    //   const jobTitle = employee.user?.job_title;

    //   return <div className="">{jobTitle}</div>;
    // },
  },
  {
    id: "role",
    accessorFn: (row) => row.user?.role,
    header: () => <div className="min-w-14">Role</div>,
    cell: ({ row }) => {
      const employee = row.original;
      const role = employee.user?.role;

      return <div className=" capitalize">{role?.replace("_", " ")}</div>;
    },
  },
  {
    id: "status",
    accessorFn: (row) => row.user?.employment_status,
    header: () => <div className="min-w-14">Status</div>,
    cell: ({ row }) => {
      const employee = row.original;
      const status = employee.user?.employment_status;

      return (
        <Badge
          variant={
            status === "active"
              ? "success"
              : status === "inactive"
                ? "warning"
                : "destructive"
          }
          className="capitalize"
        >
          {status?.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    id: "type",
    accessorFn: (row) => row.user?.employment_type,
    header: () => <div className="min-w-24 text-center">Type</div>,
    cell: ({ row }) => {
      const employee = row.original;
      const employmentType = employee.user?.employment_type;

      return (
        <div className="text-center capitalize">
          {employmentType?.replace("_", " ")}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="w-8" />,
    cell: () => {
      return (
        <div className="grid place-items-center h-full w-full">
          <ChevronRight className="h-4 w-4" />
        </div>
      );
    },
  },
];
