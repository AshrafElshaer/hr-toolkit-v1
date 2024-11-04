"use client";

import {
  type ColumnDef,
  type ColumnFilter,
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
import { Clock, UserSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  parseAsInteger,
  parseAsJson,
  useQueryState,
  useQueryStates,
} from "nuqs";

import { DataTablePagination } from "@/components/tables/data-table-pagination";
import { cn } from "@toolkit/ui/cn";
import { DataTableToolbar } from "./toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

import { getDepartmentsAction } from "@/features/departments/lib/departments.actions";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableFilterField } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { employmentTypes, roles, statuses } from "./filters";

const columnFilterSchema = z.object({
  id: z.string(),
  value: z.unknown(),
});

export const columnFiltersStateSchema = z.array(columnFilterSchema);

export function EmployeesTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const result = await getDepartmentsAction({});
      return result?.data;
    },
  });
  const [perPage] = useQueryState("perPage", parseAsInteger.withDefault(10));

  const pageCount = Math.ceil(data.length / perPage);
  const departmentOptions = departments?.map((department) => ({
    label: `${department.name} - ${department.description}`,
    value: department.id,
  }));


  const filterFields: DataTableFilterField<TData>[] = [
    {
      id: "name" as keyof TData,
      label: "Name",
    },
    {
      id: "department" as keyof TData,
      label: "Department",
      options: departmentOptions,
    },
    {
      id: "status" as keyof TData,
      label: "Status",
      options: statuses,
    },
    {
      id: "role" as keyof TData,
      label: "Role",
      options: roles,
    },
    {
      id: "type" as keyof TData,
      label: "Type",
      options: employmentTypes,
    },
  ];

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
      <DataTableToolbar table={table} />
      <div className="rounded-md border flex-grow overflow-x-scroll flex flex-col min-h-40 w-full">
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
      <DataTablePagination table={table} />
    </>
  );
}
