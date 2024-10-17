"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "@/components/tables/data-table-pagination";
import { cn } from "@toolkit/ui/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@toolkit/ui/table";
import { useState } from "react";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <>
      <DataTableToolbar table={table} />
      <div className="rounded-md border flex-grow overflow-x-scroll flex flex-col min-h-40">
        <Table isEmpty={table.getRowModel().rows.length === 0}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "text-accent-foreground bg-secondary font-semibold",
                        header.id === "actions" && "w-8",
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer"
                    // onClick={() => {
                    //   const employee =
                    //     row.original as GetOrganizationMembersQuery;
                    //   console.log(employee);
                    //   router.push(`/employees/${employee.user?.id}`);
                    // }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        {/* {table.getRowModel().rows.length === 0 && (
          <div className="flex flex-col justify-center items-center flex-grow p-4 text-sm text-secondary-foreground">
            <UserSearch className="size-16 mb-2" />
            <p className="font-semibold">No employees found</p>
          </div>
        )} */}
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
