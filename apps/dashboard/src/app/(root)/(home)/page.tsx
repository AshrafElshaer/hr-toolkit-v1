import Main from "@/components/main";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Suspense } from "react";

import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";

import { toast } from "sonner";
import ClockInOut from "./components/clock-in-out";
import { ClockInOutSkeleton } from "./components/clock-in-out/clock-in-out.loading";
import Events from "./components/events";
import { eventsSearchParamsCache } from "./components/events/events-search-params";
import WelcomeMessage from "./components/welcome";
import { WelcomeMessageLoading } from "./components/welcome/welcome.loading";
import Notes from "./components/notes";
// export const metadata = {
//   title: "Home",
// };
type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};
export default function Page({ searchParams }: Props) {
  eventsSearchParamsCache.parse(searchParams);
  return (
    <Main
      isMaxHeight
      className="space-y-4 sm:space-y-0 sm:grid  sm:gap-4 sm:grid-rows-[min-content_repeat(3,1fr)] lg:grid-rows-[min-content_repeat(2,1fr)] sm:grid-cols-2 lg:grid-cols-4"
    >
      <Suspense fallback={<WelcomeMessageLoading />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense fallback={<ClockInOutSkeleton />}>
        <ClockInOut />
      </Suspense>

      <Events />
      <Notes />
      
      <Card className="w-full  p-0 ">tasks</Card>

      <Card className="w-full  p-0 ">PROJECTS</Card>
      <Card className="w-full  p-0 ">metrics</Card>
    </Main>
  );
}
