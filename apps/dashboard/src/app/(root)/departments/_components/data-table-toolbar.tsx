"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button, buttonVariants } from "@toolkit/ui/button";
import { Input } from "@toolkit/ui/input";

import { getDepartmentsAction } from "@/actions/departments";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, Search } from "lucide-react";
import Link from "next/link";
import { IoGrid } from "react-icons/io5";
import { IoKeySharp } from "react-icons/io5";
import { MdSignalWifiStatusbarConnectedNoInternet2 } from "react-icons/md";
import DepartmentDialog from "./department-form";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { employmentTypes, roles, statuses } from "./filters";

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>;
// }

export function DataTableToolbar(
// : DataTableToolbarProps<TData>
) {
  //   const { data: departments } = useQuery({
  //     queryKey: ["departments"],
  //     queryFn: async () => {
  //       const result = await getDepartmentsAction();
  //       return result?.data;
  //     },
  //   });
//   const isFiltered = table.getState().columnFilters.length > 0;

  //   const departmentOptions = departments?.map((department) => ({
  //     label: department.name,
  //     value: department.name,
  //   }));

  return (
    <section className="flex flex-col md:flex-row gap-4 items-center justify-start  w-full">
      {/* <div className="flex items-center  md:max-w-52  w-full order-2 md:order-1">
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
            isMultiSelect={false}
            triggerIcon={<IoGrid className="size-3 mr-2" />}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            isMultiSelect={false}
            triggerIcon={
              <MdSignalWifiStatusbarConnectedNoInternet2 className="size-4 mr-2" />
            }
          />
        )}

        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
            isMultiSelect={false}
            triggerIcon={<IoKeySharp className="size-3 mr-2" />}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={employmentTypes}
            isMultiSelect={false}
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
      </div> */}

      <DepartmentDialog>
        <Button
          variant="secondary"
          className="w-full ml-auto md:w-fit min-w-fit order-2 md:order-3"
        >
          <PlusIcon className="size-4 mr-2" />
          Add Department
        </Button>
      </DepartmentDialog>
    </section>
  );
}
