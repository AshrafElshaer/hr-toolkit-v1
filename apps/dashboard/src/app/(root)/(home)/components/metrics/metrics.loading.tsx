import { Card, CardContent } from "@v1/ui/card";
import { Progress } from "@v1/ui/progress";
import { Separator } from "@v1/ui/separator";
import { Skeleton } from "@v1/ui/skeleton";
import React from "react";
import { IoStatsChart } from "react-icons/io5";

export default function MetricsLoading() {
  return (
    <Card className="w-full  p-0 min-h-[300px] max-h-[350px] md:max-h-fit">
      <div className="flex gap-2 items-center p-2">
        <IoStatsChart className="size-4" />
        <span className="font-semibold">Metrics</span>
        <span className="text-muted-foreground text-xs">This Month</span>
      </div>

      <Separator className="w-full" />

      <CardContent className="p-2">
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Working Hours</span>
              <Skeleton className="h-4 w-20" />
            </p>
            <Progress value={0} className="h-2" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completed Tasks</span>
              <Skeleton className="h-4 w-8" />
            </p>
            <p className="flex items-center justify-between text-muted-foreground text-sm">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-8" />
            </p>
            <Progress value={0} className="h-2 " />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ave. Task Duration</span>
              <Skeleton className="h-4 w-16" />
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ave. Task Priority</span>
              <Skeleton className="h-5 w-16 rounded-full" />
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Task Completion Rate
              </span>
              <Skeleton className="h-4 w-12" />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
