import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@toolkit/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@toolkit/ui/table";
interface TableLoaderProps {
  rows?: number;
  columns: React.ReactNode[];
}

export function TableLoader({ rows = 5, columns }: TableLoaderProps) {
  return (
    <div className="rounded-md border  flex-grow overflow-x-scroll flex flex-col min-h-40">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, idx) => (
              <TableHead
                key={idx.toString()}
                className="text-accent-foreground bg-secondary font-semibold"
              >
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, idx) => (
            <TableRow key={idx.toString()}>
              {Array.from({ length: columns.length }).map((_, idx) => (
                <TableCell key={idx.toString()} className="py-2">
                  <Skeleton className="w-1/2 h-5" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
