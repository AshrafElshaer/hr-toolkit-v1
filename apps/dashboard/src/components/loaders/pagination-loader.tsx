import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@toolkit/ui/button";
import { Skeleton } from "@toolkit/ui/skeleton";

export function PaginationLoader() {
  return (
    <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
      <Skeleton className="h-6 w-48" />
      <div className="flex items-center space-x-6 lg:space-x-6 sm:ml-auto">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Skeleton className="h-8 w-[70px]" />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex"
            disabled
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" disabled>
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-16" />
          <Button variant="outline" className="h-8 w-8 p-0" disabled>
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 md:flex"
            disabled
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}