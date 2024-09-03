import { format } from "date-fns";
import moment from "moment";
import type { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";
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

export function handleDateSearch(
  date: DateRange,
  searchParams: URLSearchParams,
  router: ReturnType<typeof useRouter>,
  pathname: string,
  prefix?: string,
) {
  const params = new URLSearchParams(searchParams);
  const fromKey = prefix ? `${prefix}-from` : "from";
  const toKey = prefix ? `${prefix}-to` : "to";

  if (date) {
    params.set(fromKey, format(new Date(date.from ?? ""), "yyyy-MM-dd") ?? "");
    if (date.to) {
      params.set(toKey, format(new Date(date.to ?? ""), "yyyy-MM-dd") ?? "");
    }
  } else {
    params.delete(fromKey);
    params.delete(toKey);
  }

  router.replace(`${pathname}?${params.toString()}`);
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
