import { useEffect, useState } from "react";
import { format } from "date-fns";

interface UseCurrentTimeOptions {
  enabled?: boolean;
}

export default function useCurrentTime({
  enabled = true,
}: UseCurrentTimeOptions = {}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [enabled]);

  return {
    hoursAndMinutes: format(currentTime, "hh:mm a"),
    fullDay: format(currentTime, "EEEE , MMMM dd - hh:mm a"),
  };
}
