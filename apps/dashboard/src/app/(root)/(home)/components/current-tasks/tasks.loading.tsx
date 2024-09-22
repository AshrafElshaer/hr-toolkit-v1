import React from "react";
import { Card, CardContent } from "@v1/ui/card";
import { Separator } from "@v1/ui/separator";
import { FaTasks } from "react-icons/fa";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Skeleton } from "@v1/ui/skeleton";
import { Button } from "@v1/ui/button";

export default function TasksLoading() {
  return (
    <Card className="w-full p-0">
      <div className="flex gap-2 items-center p-2">
        <FaTasks className="size-4" />
        <span className="font-semibold">Your Tasks</span>
        <Button size="xs" variant="secondary" className="ml-auto" disabled>
          View All
        </Button>
      </div>

      <Separator className="w-full" />
      <CardContent className="p-0">
        <div className="h-64">
          {[...Array(3)].map((_, index) => (
            <div
              key={index.toString()}
              className="flex flex-col py-2 pl-3 pr-4 border-b gap-2 text-sm relative last:border-b-0"
            >
              <div className="space-y-1">
                <div className="flex justify-between w-full">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-4" />
                </div>
                <Skeleton className="h-3 w-full" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-16 ml-auto" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="absolute left-0 top-2.5 h-4 w-1.5 rounded-r">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
