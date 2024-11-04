"use client";

import {
  type ColumnDef,
  type ColumnFilter,
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

import { columnFiltersStateSchema } from "@/features/user/components/employees-table/table";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableFilterField } from "@/types";
import { type TimeSheet, TimeSheetStatusEnum } from "@toolkit/supabase/types";
import { Clock } from "lucide-react";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsJson,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useEffect, useMemo, useState } from "react";
import { TbClockX } from "react-icons/tb";
import { z } from "zod";
import { DataTableToolbar } from "./toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isAdmin?: boolean;
}

export function TimeSheetTable<TData, TValue>({
  columns,
  data,
  isAdmin = false,
}: DataTableProps<TData, TValue>) {
  const [perPage] = useQueryState("perPage", parseAsInteger.withDefault(10));

  const filterFields: DataTableFilterField<TData>[] = [
    {
      id: "status" as keyof TData,
      label: "Status",
      options: Object.values(TimeSheetStatusEnum).map((status) => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
        icon: Clock,
        count: 0,
      })),
    },
  ];

  const pageCount = Math.ceil(data.length / perPage);

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [],
      columnPinning: { right: ["actions"] },
    },
    // getRowId: (originalRow, index) => `${originalRow ?? index}`,
    shallow: false,
    clearOnDefault: true,
    debounceMs: 0,
  });

  return (
    <>
      <DataTableToolbar table={table} isAdmin={isAdmin} />
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
            <TbClockX className="size-16 mb-2" />
            <p className="font-semibold">No attendance records found</p>
          </div>
        )}
      </div>
      <DataTablePagination table={table} isSelectable={isAdmin} />
    </>
  );
}
