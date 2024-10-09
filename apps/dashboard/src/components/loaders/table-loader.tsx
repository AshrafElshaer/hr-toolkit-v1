import { Skeleton } from "@toolkit/ui/skeleton";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface TableLoaderProps {
  rows?: number;
  columns?: number;
}

export function TableLoader({ rows = 5, columns = 6 }: TableLoaderProps) {
  return (
    <div className="rounded-md border flex-grow overflow-x-scroll flex flex-col min-h-40">
      <Skeleton className="w-full h-12 rounded-none" />
      {[...Array(rows)].map((_, index) => (
        <div
          className="flex items-center gap-6 px-4 w-full h-10 text-accent-foreground border-b"
          key={index.toString()}
        >
          {[...Array(columns)].map((_, colIndex) => (
            <Skeleton
              key={colIndex.toString()}
              className="min-w-24 w-full h-6"
            />
          ))}
          <div className="min-w-8 flex items-center justify-center">
            <ChevronRightIcon className="size-4" />
          </div>
        </div>
      ))}
    </div>
  );
}