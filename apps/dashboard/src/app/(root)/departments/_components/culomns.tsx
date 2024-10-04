"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type {
  Department,
  DepartmentMember,
  GetOrganizationMembersQuery,
  User,
} from "@toolkit/supabase/types";

import { ChevronRight, MoreHorizontal } from "lucide-react";

import { Avatar, AvatarGroup } from "@toolkit/ui/avatar";
import { Badge } from "@toolkit/ui/badge";
import { Button } from "@toolkit/ui/button";

interface DepartmentQuery extends Department {
  manager: User | null;
  members: DepartmentMember[];
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
    header: () => <div className="min-w-24">Description</div>,
  },
  {
    id: "manager",
    accessorFn: (row) => `${row.manager?.first_name} ${row.manager?.last_name}`,
    header: () => <div className="min-w-24">Manager</div>,
    cell: ({ row }) => {
      const department = row.original;
      const manager = department.manager;

      return (
        <div className=" flex items-center gap-2">
          <Avatar
            src={manager?.avatar_url}
            initials={`${manager?.first_name[0] ?? ""}${manager?.last_name[0] ?? ""}`}
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
    header: () => <div className="min-w-24 text-center">Members</div>,
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
