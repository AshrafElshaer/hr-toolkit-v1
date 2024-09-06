import { Card } from "@v1/ui/card";
import { Skeleton } from "@v1/ui/skeleton";

export function ClockInOutSkeleton() {
  return (
    <Card className="  flex flex-col h-fit p-4 gap-4 w-full  ">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground/70 font-semibold">Clock In/Out</h3>
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-8 w-full " />
    </Card>
  );
}
