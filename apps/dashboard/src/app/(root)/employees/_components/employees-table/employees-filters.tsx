"use client";

import type { Table } from "@tanstack/react-table";
import { Button, buttonVariants } from "@toolkit/ui/button";
import { Input } from "@toolkit/ui/input";
import { FilterIcon, PlusIcon, Search } from "lucide-react";
import Link from "next/link";

type PageHeaderProps<TData> = {
  table: Table<TData>;
};

export default function EmployeesFilters<TData>({
  table,
}: PageHeaderProps<TData>) {
  return (
    <section className="flex justify-start items-center gap-2">
      <div className="flex items-center  max-w-xs">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          startIcon={Search}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary">
          <FilterIcon className="size-3 mr-2" />
          Filter
        </Button>
      </div>
      <Link
        href="/employees/new"
        className={buttonVariants({ variant: "default", className: "ml-auto" })}
      >
        <PlusIcon className="size-4 mr-2" />
        Add Employee
      </Link>
    </section>
  );
}
