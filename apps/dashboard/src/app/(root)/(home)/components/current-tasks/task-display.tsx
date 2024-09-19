import { cn } from "@v1/ui/cn";
import moment from "moment";
import React from "react";
// import { capitalize } from "lodash";

// import type { TaskSelect } from "@v1/supabase/types";

import { IconName, Icons } from "@/components/icons";
import { Badge } from "@v1/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@v1/ui/hover-card";

type Props = {
  task: {
    id: string;
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "completed" | "in_progress" | "to_do" | "in_review";
    created_at: string;
    updated_at: string;
    due_date: string;
    assigned_to: string;
    organization_id: string;
    project_id: string;
  };
};

export default function TaskDisplay({ task }: Props) {
  const isOverDue = moment(task.due_date).isBefore(moment());

  let statusIndicatorColor: string;
  if (task.status === "in_progress") {
    statusIndicatorColor = "bg-warning";
  } else if (task.status === "completed") {
    statusIndicatorColor = "bg-success";
  } else if (task.status === "to_do") {
    statusIndicatorColor = "bg-primary";
  } else if (task.status === "in_review") {
    statusIndicatorColor = "bg-blue";
  } else {
    statusIndicatorColor = "bg-muted";
  }

  return (
    <div className="flex flex-col py-2 px-3 border-b gap-2 text-sm relative last:border-b-0">
      <div className="*:text-ellipsis *:overflow-hidden *:whitespace-nowrap space-y-1">
        <div className="flex justify-between w-full">
          <p className="font-semibold ">{task.name}</p>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild className="size-4 text-muted-foreground">
              {task.priority === "low" ? (
                <Icons.PriorityLow />
              ) : task.priority === "medium" ? (
                <Icons.PriorityMedium />
              ) : (
                <Icons.PriorityHigh />
              )}
            </HoverCardTrigger>
            <HoverCardContent
              side="top"
              align="end"
              className="text-sm p-2 w-fit capitalize"
            >
              {task.priority} Priority
            </HoverCardContent>
          </HoverCard>
        </div>

        <p className="text-muted-foreground">{task.description}</p>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground ">
        <p
          className={cn(
            "text-xs ml-auto",
            isOverDue ? "text-destructive" : "text-foreground",
          )}
        >
          {isOverDue ? "Overdue" : "Due at"}
        </p>

        <p
          className={cn(
            "text-xs",
            isOverDue ? "text-destructive" : "text-foreground",
          )}
        >
          {moment(task.due_date).format("DD MMM , YYYY")}
        </p>
      </div>

      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              "absolute left-0 top-2.5 h-4  w-1.5 rounded-r ",
              statusIndicatorColor,
            )}
          />
        </HoverCardTrigger>
        <HoverCardContent
          side="right"
          align="center"
          className="text-sm w-fit p-2 capitalize"
        >
          {task.status
            .split("_")

            .join(" ")}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
