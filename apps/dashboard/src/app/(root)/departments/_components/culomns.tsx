"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type {
  Department,
  DepartmentMember,
  GetOrganizationMembersQuery,
  User,
} from "@toolkit/supabase/types";

import { ChevronRight, MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/tables/data-table-column-header";
import { Avatar, AvatarGroup } from "@toolkit/ui/avatar";
import { Badge } from "@toolkit/ui/badge";
import { Button } from "@toolkit/ui/button";
import { GoDash } from "react-icons/go";

export interface DepartmentQuery extends Department {
  manager: User | null;
  members: { user_id: string }[];
}

export const columns: ColumnDef<DepartmentQuery>[] = [
  {
    id: "name",
    accessorFn: (row) => row.name,
    header: () => <div className="min-w-24">Name</div>,
  },
  {
    id: "description",
    accessorFn: (row) => row.description,
    header: () => <div className="min-w-44">Description</div>,
    cell: ({ row }) => {
      const department = row.original;
      const description = department.description;

      if (!description) return <GoDash />;

      return <div>{description}</div>;
    },
  },
  {
    id: "manager",
    accessorFn: (row) => `${row.manager?.first_name} ${row.manager?.last_name}`,
    header: () => <div className="min-w-44">Manager</div>,
    cell: ({ row }) => {
      const department = row.original;
      const manager = department.manager;

      if (!manager) return <GoDash />;

      return (
        <div className=" flex items-center gap-2">
          <Avatar
            src={manager?.avatar_url}
            initials={
              manager?.avatar_url
                ? undefined
                : `${manager?.first_name[0] ?? ""}${manager?.last_name[0] ?? ""}`
            }
            size="small"
          />
          {manager?.first_name} {manager?.last_name}
        </div>
      );
    },
  },

  {
    id: "members",
    accessorFn: (row) => row.members.length,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Members"
        className="justify-center"
      />
    ),
    cell: ({ row }) => {
      const department = row.original;
      const members = department.members;

      return (
        <div className="text-base font-semibold text-center">
          {members.length}
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
