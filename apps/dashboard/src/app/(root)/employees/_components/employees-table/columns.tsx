"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";

import { MoreHorizontal } from "lucide-react";

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

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const employee = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem onClick={() => console.log({ employee })}>
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
