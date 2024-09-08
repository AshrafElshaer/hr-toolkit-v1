"use client";
import useCurrentTime from "@/hooks/use-current-time";

import { useEffect, useState } from "react";

export default function CurrentTime() {
  const { fullDay } = useCurrentTime();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <h4 className="  text-sm font-semibold  text-foreground w-fit">
      {fullDay}
    </h4>
  );
}
