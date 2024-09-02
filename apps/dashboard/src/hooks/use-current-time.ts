import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return {
    hoursAndMinutes: format(currentTime, "hh:mm a"),
    fullDay: format(currentTime, "EEEE , MMMM dd - hh:mm a"),
  };
}
