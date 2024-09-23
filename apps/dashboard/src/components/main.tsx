import { cn } from "@v1/ui/cn";
import type React from "react";

export default function Main({
  className,
  children,
  isMaxHeight,
  mdMaxHeight,
  ...props
}: React.ComponentProps<"main"> & {
  isMaxHeight?: boolean;
  mdMaxHeight?: boolean;
}) {
  return (
    <main
      className={cn(
        "w-full md:w-[calc(100%_-_3.3rem)] p-4 pt-[11px] ml-auto min-h-[calc(100svh_-_50px)]",
        isMaxHeight && "min-h-[calc(100svh_-_50px)]",
        mdMaxHeight && "md:h-[calc(100svh_-_50px)]",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}
