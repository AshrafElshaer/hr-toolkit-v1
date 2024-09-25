import { Badge } from "@toolkit/ui/badge";
import { Card, CardContent } from "@toolkit/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@toolkit/ui/hover-card";
import { Progress } from "@toolkit/ui/progress";
import { Separator } from "@toolkit/ui/separator";
import React from "react";
import { IoStatsChart } from "react-icons/io5";

export default function Metrics() {
  const plannedHours = 160;
  const workedHours = 100;
  const workedHoursPercentage = (workedHours / plannedHours) * 100;

  const completedTasks = 24;
  const onTimeTasks = 20;
  const lateTasks = 4;

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
              <span>
                {workedHours} / {plannedHours} Hrs
              </span>
            </p>
            <Progress value={workedHoursPercentage} className="h-2" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completed Tasks</span>
              <span>{completedTasks}</span>
            </p>
            <p className="flex items-center justify-between text-muted-foreground text-sm">
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <span>
                    {onTimeTasks} -{" "}
                    {Math.round((onTimeTasks / completedTasks) * 100)}%
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit p-2 text-sm">
                  <p>On Time</p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <span>{lateTasks}</span>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit p-2 text-sm">
                  <p>Late</p>
                </HoverCardContent>
              </HoverCard>
            </p>
            <Progress
              value={(onTimeTasks / completedTasks) * 100}
              className="h-2 bg-destructive"
              progressBarColor="bg-success"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ave. Task Duration</span>
              <span>5 Days</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Ave. Task Priority</span>
              <Badge
                variant="warning"
                className="font-light text-xs   rounded-full px-2 py-[0.075] "
              >
                Medium
              </Badge>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Task Completion Rate
              </span>
              <span>80%</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
