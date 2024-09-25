import { Card } from "@toolkit/ui/card";
import { Skeleton } from "@toolkit/ui/skeleton";

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
