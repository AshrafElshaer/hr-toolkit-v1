"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@toolkit/ui/button";
import { Badge } from "@toolkit/ui/badge";
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
    accessorFn: (row) => `${row.user?.first_name} ${row.user?.last_name}`,
    header: "Name",
  },

  {
    accessorFn: (row) =>
      `${row.department?.name} - ${row.department?.description}`,
    header: "Department",
  },
  {
    accessorFn: (row) => row.user?.job_title,
    header: "Job Title",
  },
  {
    accessorFn: (row) => row.user?.role,
    header: "Role",
  },
  {
    accessorFn: (row) => row.user?.employment_status,
    header: "Status",
    cell: ({ row }) => {
      const employee = row.original;
      const status = employee.user?.employment_status;

      return (
        <Badge
          variant={
            status === "active"
              ? "success"
              : status === "inactive"
                ? "destructive"
                : "secondary"
          }
          className="capitalize"
        >
          {status?.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorFn: (row) => row.user?.employment_type,
    header: " Type",
    cell: ({ row }) => {
      const employee = row.original;
      const employmentType = employee.user?.employment_type;

      return employmentType?.replace("_", " ");
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
