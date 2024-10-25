"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button, buttonVariants } from "@toolkit/ui/button";
import { Input } from "@toolkit/ui/input";

import { DataTableFacetedFilter } from "@/components/tables/data-table-faceted-filter";
import { getDepartmentsAction } from "@/features/departments/departments.actions";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, Search } from "lucide-react";
import Link from "next/link";
import { IoGrid } from "react-icons/io5";
import { IoKeySharp } from "react-icons/io5";
import { MdSignalWifiStatusbarConnectedNoInternet2 } from "react-icons/md";
import { employmentTypes, roles, statuses } from "./filters";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const result = await getDepartmentsAction();
      return result?.data;
    },
  });
  const isFiltered = table.getState().columnFilters.length > 0;

  const departmentOptions = departments?.map((department) => ({
    label: `${department.name} - ${department.description}`,
    value: department.id,
  }));

  return (
    <section className="flex flex-col md:flex-row gap-4 items-center justify-start  w-full">
      <div className="flex items-center  md:max-w-52  w-full order-2 md:order-1">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          startIcon={Search}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="flex items-center space-x-2 w-full md:w-fit order-3 md:order-2 overflow-x-scroll scrollbar-hide">
        {table.getColumn("department") && (
          <DataTableFacetedFilter
            column={table.getColumn("department")}
            title="Department"
            options={departmentOptions ?? []}
            isMultiSelect={true}
            triggerIcon={<IoGrid className="size-3 mr-2" />}
            containerClassName="min-w-[270px]"
          />
        )}
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

        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
            isMultiSelect={true}
            triggerIcon={<IoKeySharp className="size-3 mr-2" />}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={employmentTypes}
            isMultiSelect={true}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-3 w-3" />
          </Button>
        )}
      </div>
      <Link
        href="/employees/new"
        className={buttonVariants({
          variant: "default",
          className: "ml-auto w-full md:w-fit min-w-fit order-1 md:order-3",
        })}
      >
        Add Employee
        <PlusIcon className="size-4 ml-2" />
      </Link>
    </section>
  );
}
