import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { useCallback } from "react";

import { Button } from "@toolkit/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@toolkit/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  isSelectable?: boolean;
}

export function DataTablePagination<TData>({
  table,
  isSelectable = false,
}: DataTablePaginationProps<TData>) {
  const handlePageSizeChange = useCallback(
    (value: string) => {
      const newPageSize = Number(value);
      if (newPageSize !== table.getState().pagination.pageSize) {
        table.setPageSize(newPageSize);
      }
    },
    [table],
  );

  const goToFirstPage = useCallback(() => table.setPageIndex(0), [table]);
  const goToPreviousPage = useCallback(() => table.previousPage(), [table]);
  const goToNextPage = useCallback(() => table.nextPage(), [table]);
  const goToLastPage = useCallback(
    () => table.setPageIndex(table.getPageCount() - 1),
    [table],
  );

  return (
    <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
      {isSelectable && (
        <div className="text-sm text-secondary-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      )}
      <div className="flex items-center space-x-6 lg:space-x-6 sm:ml-auto">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue
                placeholder={`${table.getState().pagination.pageSize}`}
              />
            </SelectTrigger>
            <SelectContent side="top" className="min-w-0 w-[70px]">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex"
            onClick={goToFirstPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToPreviousPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex gap-2 px-4 h-8 items-center border rounded-md justify-center text-sm font-medium text-muted-foreground">
            <span className="text-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>
            /<span>{table.getPageCount()}</span>
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={goToNextPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex"
            onClick={goToLastPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
