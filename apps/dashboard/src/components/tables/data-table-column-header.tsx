import type { Column } from "@tanstack/react-table";

import { Button } from "@toolkit/ui/button";
import { cn } from "@toolkit/ui/cn";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  function toggleSorting() {
    const currentSort = column.getIsSorted();
    if (currentSort === false) {
      column.toggleSorting(false);
    } else if (currentSort === "asc") {
      column.toggleSorting(true);
    } else {
      column.clearSorting();
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleSorting}
      className={cn(
        "h-8 data-[state=open]:bg-accent text-accent-foreground font-semibold justify-center p-0",
        className,
      )}
    >
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
