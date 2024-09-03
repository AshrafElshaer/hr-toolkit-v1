"use client";
import Main from "@/components/main";

import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";

import { toast } from "sonner";
// export const metadata = {
//   title: "Home",
// };

export default function Page() {
  return (
    <Main
      isMaxHeight
      className="grid gap-4 sm:grid-rows-[min-content_repeat(3,1fr)] lg:grid-rows-[min-content_repeat(2,1fr)] sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="flex  lg:col-span-3">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      </div>
      <Card className="  flex flex-col h-fit p-4 gap-4 w-full  ">
        Clock in out
      </Card>

      <Card className="w-full sm:col-span-2 lg:col-span-4 p-2">
        calendar
      </Card>
      <Card className="w-full  p-0 ">notes</Card>
      <Card className="w-full  p-0 ">tasks</Card>

      <Card className="w-full  p-0 ">PROJECTS</Card>
      <Card className="w-full  p-0 ">metrics</Card>
    </Main>
  );
}
