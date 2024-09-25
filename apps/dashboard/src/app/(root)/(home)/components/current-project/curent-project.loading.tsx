"use client";

import { Button, buttonVariants } from "@toolkit/ui/button";
import { Card, CardContent } from "@toolkit/ui/card";
import { Separator } from "@toolkit/ui/separator";
import { Zap } from "lucide-react";
import React from "react";
import { Skeleton } from "@toolkit/ui/skeleton";

export default function CurrentProjectLoading() {
  return (
    <Card className="w-full p-0 min-h-[300px] max-h-[350px] md:max-h-fit">
      <div className="flex gap-2 items-center p-2">
        <Zap className="size-4" />
        <span className="font-semibold">Current Project</span>
        <Button variant="secondary" size="xs" className="ml-auto" disabled>
          Go To Project
        </Button>
      </div>

      <Separator className="w-full" />

      <CardContent className="p-2">
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-10" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="flex gap-2 justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="flex justify-between items-center gap-2">
            <Skeleton className="h-6 w-28" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
