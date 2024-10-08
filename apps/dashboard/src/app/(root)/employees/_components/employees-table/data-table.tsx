"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { GetOrganizationMembersQuery } from "@toolkit/supabase/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@toolkit/ui/table";
import { UserSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsJson, useQueryState } from "nuqs";

import { DataTablePagination } from "@/components/tables/data-table-pagination";
import { cn } from "@toolkit/ui/cn";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useQueryState(
    "filters",
    parseAsJson().withDefault([]),
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: columnFilters as ColumnFiltersState,
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
                    onClick={() => {
                      const employee =
                        row.original as GetOrganizationMembersQuery;
                      router.push(`/employees/${employee.user?.id}`);
                    }}
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
        {table.getRowModel().rows.length === 0 && (
          <div className="flex flex-col justify-center items-center flex-grow p-4 text-sm text-secondary-foreground">
            <UserSearch className="size-16 mb-2" />
            <p className="font-semibold">No employees found</p>
          </div>
        )}
      </div>
      {/* <DataTablePagination table={table} /> */}
    </>
  );
}
