import type { TimeSheetBreak } from "@v1/supabase/types";

import moment from "moment";

export function currentTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
export function amPm(time: string) {
  const [hours, minutes] = time.split(":");
  const hoursInt = Number(hours);
  const amPm = hoursInt >= 12 ? "PM" : "AM";
  const hours12 = hoursInt % 12 || 12;
  return `${hours12}:${minutes} ${amPm}`;
}

export function differenceInBusinessDays(startDate: Date, endDate: Date) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  const currentDate = new Date(start); // Use a separate variable for iteration

  while (currentDate <= end) {
    const day = currentDate.getDay();
    if (day !== 0 && day !== 6) {
      // Check if the day is not Sunday (0) or Saturday (6)
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
  return count;
}

export function getHoursFromMinutes(minutes: number) {
  return (minutes / 60).toFixed(2);
}

export function getDaysInMonth(year: number, month: number) {
  const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(
      moment(`${year}-${month}-${day}`, "YYYY-MM-DD").format("YYYY-MM-DD"),
    );
  }

  return daysArray;
}

export function calcWorkedTime(
  clockInAt: Date,
  breaks: TimeSheetBreak[] = [],
  clockOutAt?: Date,
) {
  const endTime = clockOutAt || new Date();
  const clockInTime = clockInAt.getTime();

  // Calculate the total break time
  const totalBreakTime = breaks.reduce((accumulatedBreakTime, currentBreak) => {
    const breakStartTime = currentBreak.break_start
      ? new Date(currentBreak.break_start).getTime()
      : 0;
    const breakEndTime = currentBreak.break_end
      ? new Date(currentBreak.break_end).getTime()
      : endTime.getTime(); // Use end time if break is ongoing

    if (breakStartTime) {
      // Calculate the duration of each break and add it to the total
      return accumulatedBreakTime + (breakEndTime - breakStartTime);
    }

    return accumulatedBreakTime;
  }, 0);

  // Calculate total work time excluding breaks
  const totalWorkTime = endTime.getTime() - clockInTime - totalBreakTime;

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(totalWorkTime / (1000 * 60 * 60));
  const minutes = Math.floor((totalWorkTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalWorkTime % (1000 * 60)) / 1000);

  return {
    hours,
    minutes,
    seconds,
  };
}
