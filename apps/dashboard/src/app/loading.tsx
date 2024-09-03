import LogoSVG from "@/components/logo-svg";
import { Button } from "@v1/ui/button";
import { ResizablePanel, ResizablePanelGroup } from "@v1/ui/resizable";
import { Skeleton } from "@v1/ui/skeleton";
import { cn } from "@v1/ui/cn";
import { PanelLeftOpen, Search } from "lucide-react";
import React from "react";

export default function AppShellLoading() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full  border min-h-[100svh] max-w-[1440px] mx-auto"
    >
      {" "}
      <ResizablePanel
        defaultSize={1}
        className="border-r min-w-[3.2rem] hidden md:block shadow-md"
      >
        <div className="w-full grid place-content-center p-3">
          <LogoSVG className="text-foreground fill-current size-7" />
        </div>
        <div className="flex flex-col items-start justify-start h-full gap-1 p-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={(index + 1).toString()}
              className={cn("w-full h-7", index === 6 && "mt-6")}
            />
          ))}
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={96}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={4} className="min-h-[50px]  grid">
            <header className="px-2 md:px-4">
              <ul className="flex items-center justify-between h-[50px] w-full gap-4">
                <li className="grid h-fit md:hidden">
                  <Button size="icon" variant="ghost" disabled>
                    <PanelLeftOpen size={20} />
                  </Button>
                </li>
                <li className="flex md:hidden items-center gap-2 text-foreground">
                  <LogoSVG className="fill-current w-6 h-6 select-none" />
                  <h1 className="text-lg font-semibold select-none">
                    HR Toolkit
                  </h1>
                </li>
                <li className="hidden md:block">
                  <Button
                    variant={"outline"}
                    className="text-muted-foreground w-72 flex items-center gap-2 px-2"
                    disabled
                  >
                    <Search className="size-4" />
                    <span>Quick Search</span>
                    <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </Button>
                </li>
                <li className="ml-auto hidden md:block">
                  <Skeleton className="w-48 h-5" />
                </li>

                <li className="flex items-center justify-end gap-2 ">
                  <Skeleton className="w-8 h-8 rounded-full" />
                </li>
              </ul>
            </header>
          </ResizablePanel>

          <ResizablePanel
            defaultSize={99}
            className="grid place-content-center"
          >
            <LogoSVG className="fill-current w-20 h-20 select-none" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
