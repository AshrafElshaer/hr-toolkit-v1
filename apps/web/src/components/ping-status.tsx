import React, { type HTMLAttributes } from "react";

import { cn } from "@toolkit/ui/cn";

type Props = {
  variant: "online" | "offline" | "warning";
} & HTMLAttributes<HTMLDivElement>;

function PingStatus({ variant, className }: Props) {
  const status =
    variant === "online"
      ? "bg-lime-500"
      : variant === "offline"
        ? "bg-red-500"
        : "bg-yellow-500";
  return (
    <div
      className={cn(
        " flex h-2 w-2 items-center justify-center relative",
        className,
      )}
    >
      <span
        className={cn(
          "animation-delay-4000 absolute  flex h-3 w-3  animate-ping rounded-full   opacity-75",
          status,
        )}
      />
      <span
        className={cn(" relative inline-flex h-2 w-2 rounded-full", status)}
      />
    </div>
  );
}

export default PingStatus;
