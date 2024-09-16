import React from "react";

// import type { TaskSelect } from "@hr-toolkit/supabase/types";

import { Button, buttonVariants } from "@v1/ui/button";
import { Card, CardContent } from "@v1/ui/card";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Separator } from "@v1/ui/separator";
import Link from "next/link";
import { BiTaskX } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import TaskDisplay from "./task-display";

const tasks: {
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
}[] = [
  {
    id: "1",
    name: "Project Kickoff Meeting",
    description: "Discuss project scope and milestones with the team.",
    priority: "high",
    status: "in_progress",
    created_at: "2021-07-01T09:00:00Z",
    updated_at: "2021-07-01T09:30:00Z",
    due_date: "2025-07-01T10:00:00Z",
    assigned_to: "John Doe",
    organization_id: "1",
    project_id: "1",
  },
  {
    id: "2",
    name: "Project Kickoff Meeting",
    description: "Discuss project scope and milestones with the team.",
    priority: "medium",
    status: "to_do",
    created_at: "2021-07-01T09:00:00Z",
    updated_at: "2021-07-01T09:30:00Z",
    due_date: "2021-07-01T10:00:00Z",
    assigned_to: "John Doe",
    organization_id: "1",
    project_id: "1",
  },
  {
    id: "3",
    name: "Project Kickoff Meeting",
    description: "Discuss project scope and milestones with the team.",
    priority: "low",
    status: "completed",
    created_at: "2021-07-01T09:00:00Z",
    updated_at: "2021-07-01T09:30:00Z",
    due_date: "2021-07-01T10:00:00Z",
    assigned_to: "John Doe",
    organization_id: "1",
    project_id: "1",
  },
  {
    id: "4",
    name: "Project Kickoff Meeting",
    description: "Discuss project scope and milestones with the team.",
    priority: "high",
    status: "in_review",
    created_at: "2021-07-01T09:00:00Z",
    updated_at: "2021-07-01T09:30:00Z",
    due_date: "2021-07-01T10:00:00Z",
    assigned_to: "John Doe",
    organization_id: "1",
    project_id: "1",
  },
];

export default function CurrentTasks() {
  return (
    <Card className="w-full  min-h-[300px] max-h-[350px] md:max-h-fit flex flex-col  p-0  overflow-hidden">
      <div className="flex gap-2 items-center p-2">
        <FaTasks className="size-4" />
        <span className="font-semibold">Your Tasks</span>
        <Link
          href="/projects"
          className={buttonVariants({
            variant: "secondary",
            size: "xs",
            className: "ml-auto",
          })}
        >
          View All
        </Link>
      </div>

      <Separator className="w-full " />
      <CardContent className="p-0  flex-grow overflow-scroll scrollbar-hide">
        {tasks.length === 0 ? (
          <TasksEmptyState />
        ) : (
          tasks.map((task) => <TaskDisplay key={task.id} task={task} />)
        )}
      </CardContent>
    </Card>
  );
}

function TasksEmptyState() {
  return (
    <div className="relative p-2 text-center h-64 flex flex-col justify-center items-center text-muted-foreground tex-sm ">
      <BiTaskX size={75} />
      <p className="mt-4">No tasks assigned !</p>
    </div>
  );
}
