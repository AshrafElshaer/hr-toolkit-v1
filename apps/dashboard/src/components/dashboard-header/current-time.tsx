"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import useCurrentTime from "@/hooks/use-current-time";

export default function CurrentTime() {
  const { fullDay } = useCurrentTime();
useEffect(()=>{
  
},[])
  return (
    <h4 className="  text-sm font-semibold  text-secondary-foreground/80 w-fit">
      {fullDay}
    </h4>
  );
}
