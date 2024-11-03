import { Card, CardContent, CardHeader } from "@toolkit/ui/card";
import { Separator } from "@toolkit/ui/separator";
import { Skeleton } from "@toolkit/ui/skeleton";

export function HoursBreakdownLoading() {
  return (
    <Card className="flex flex-col items-start p-0 sm:flex-row">
      <CardHeader className="font-bold min-w-fit p-4">Hours Summary</CardHeader>
      <div className="w-full sm:w-[1px] sm:self-stretch">
        <Separator orientation="horizontal" className="w-full sm:hidden" />
        <Separator orientation="vertical" className="hidden sm:block h-full" />
      </div>
      <CardContent className="flex flex-row flex-wrap items-start justify-between gap-4 p-4 w-full">
        <div className="flex items-center gap-2">
          <p className="font-semibold">Scheduled :</p>
          <Skeleton className="h-4 w-12" />
          <span>Hrs</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Worked :</p>
          <Skeleton className="h-4 w-12" />
          <span>Hrs</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Remaining :</p>
          <Skeleton className="h-4 w-12" />
          <span>Hrs</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Overtime :</p>
          <Skeleton className="h-4 w-12" />
          <span>Hrs</span>
        </div>
      </CardContent>
    </Card>
  );
}
