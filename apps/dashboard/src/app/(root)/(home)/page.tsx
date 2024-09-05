import Main from "@/components/main";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Suspense } from "react";

import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";

import { toast } from "sonner";
import ClockInOut from "./components/clock-in-out";
import WelcomeMessage from "./components/welcome";
import { WelcomeMessageLoading } from "./components/welcome/welcome.loading";
// export const metadata = {
//   title: "Home",
// };

export default function Page() {
  return (
    <Main
      isMaxHeight
      className="grid gap-4 sm:grid-rows-[min-content_repeat(3,1fr)] lg:grid-rows-[min-content_repeat(2,1fr)] sm:grid-cols-2 lg:grid-cols-4"
    >
      <Suspense fallback={<WelcomeMessageLoading />}>
        {/* <WelcomeMessageLoading /> */}
        <WelcomeMessage />
      </Suspense>

      <ClockInOut />

      <Card className="w-full sm:col-span-2 lg:col-span-4 p-2 min-h-[250px]">calendar</Card>
      <Card className="w-full overflow-scroll scrollbar-hide min-h-[250px] max-h-[350px]  p-0 ">
        <div className="h-[100px] w-full bg-red-500">notes</div>
        <div className="h-[100px] w-full bg-blue-500">notes</div>
        <div className="h-[100px] w-full bg-slate-500">notes</div>
        <div className="h-[100px] w-full bg-orange-500">notes</div>
      </Card>
      <Card className="w-full  p-0 ">tasks</Card>

      <Card className="w-full  p-0 ">PROJECTS</Card>
      <Card className="w-full  p-0 ">metrics</Card>
    </Main>
  );
}
