import { Avatar } from "@toolkit/ui/avatar";
import { Badge } from "@toolkit/ui/badge";
import { Button, buttonVariants } from "@toolkit/ui/button";
import { Card, CardContent } from "@toolkit/ui/card";
import { Progress } from "@toolkit/ui/progress";
import Link from "next/link";

import { Separator } from "@toolkit/ui/separator";
import { Calendar, Pencil, Zap } from "lucide-react";
import React from "react";
import { MdElectricBolt } from "react-icons/md";

export  function CurrentProject() {
  return (
    <Card className="w-full p-0 min-h-[300px] max-h-[350px] md:max-h-fit">
      <div className="flex gap-2 items-center p-2">
        <MdElectricBolt className="size-4" />
        <span className="font-semibold">Current Project</span>
        <Link
          href="/projects/1"
          className={buttonVariants({
            variant: "secondary",
            size: "xs",
            className: "ml-auto",
          })}
        >
          Go To Project
        </Link>
      </div>

      <Separator className="w-full  " />

      <CardContent className="p-2">
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <p className="flex font-semibold">
              Monday Redesign
              <Badge
                variant="warning"
                size="sm"
                className="ml-auto rounded-full font-normal"
              >
                In Progress
              </Badge>
            </p>
            <p className="text-muted-foreground text-sm ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center justify-between">
              <p className="font-semibold">Progress</p>
              <p>20%</p>
            </div>
            <Progress
              value={20}
              className="h-2"
              progressBarColor="bg-success"
            />
          </div>
          <div className="flex  gap-2 justify-between">
            <p className="font-semibold">Time line</p>
            <p className="text-muted-foreground">Jan 12, 2024 - Dec 12, 2024</p>
          </div>

          <div className="flex justify-between items-center gap-2">
            <p className="font-semibold">Project Leader</p>
            <div className="flex items-center gap-2">
              <Avatar
                shape="circle"
                size="medium"
                // src={currentUser.avatar_url ?? ""}
                initials={"AE"}
              />
              <p>Ashraf E.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export * from "./curent-project.loading";
