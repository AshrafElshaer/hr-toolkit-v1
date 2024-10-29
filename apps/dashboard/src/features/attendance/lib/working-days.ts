import moment from "moment";

export function countWorkingDaysInRange(
  startDate: string,
  endDate: string,
  workingDays: string[],
): number {
  const workingDaySet = new Set(workingDays);
  let count = 0;
  const currentDate = moment(startDate);

  while (currentDate.isSameOrBefore(endDate)) {
    const dayOfWeek = currentDate.day().toString();

    if (workingDaySet.has(dayOfWeek)) {
      count++;
    }

    currentDate.add(1, "day");
  }

  return count;
}
