"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "@toolkit/ui/button";
import { Input } from "@toolkit/ui/input";

import { PlusIcon, Search } from "lucide-react";

import { DepartmentDialog } from "../department-form";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <section className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-start  w-full">
      <div className="flex items-center  sm:max-w-52  w-full ">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          startIcon={Search}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <DepartmentDialog>
        <Button
          variant="secondary"
          className="w-full ml-auto sm:w-fit min-w-fit"
        >
          Add Department
          <PlusIcon className="size-4 ml-2" />
        </Button>
      </DepartmentDialog>
    </section>
  );
}
