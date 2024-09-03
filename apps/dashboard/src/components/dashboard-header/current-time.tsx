"use client";
import useCurrentTime from "@/hooks/use-current-time";

import { useEffect } from "react";

export default function CurrentTime() {
  const { fullDay } = useCurrentTime();
  useEffect(() => {}, []);
  return (
    <h4 className="  text-sm font-semibold  text-foreground w-fit">
      {fullDay}
    </h4>
  );
}
