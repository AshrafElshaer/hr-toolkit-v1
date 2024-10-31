"use client";
import NumberFlow, { type Format } from "@number-flow/react";

type Props = {
  totalScheduledHours: number;
  totalWorkedHours: number;
  overtime: number;
};

const format: Format = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

export function HoursBreakdown({
  totalScheduledHours,
  totalWorkedHours,
  overtime,
}: Props) {
  return (
    <>
      <div className="flex items-center gap-2">
        <p className=" font-semibold">Scheduled :</p>
        <NumberFlow
          willChange
          continuous
          value={totalScheduledHours}
          format={format}
        />{" "}
        Hrs
      </div>
      <div className="flex items-center gap-2">
        <p className=" font-semibold">Worked :</p>
        <NumberFlow
          willChange
          continuous
          value={totalWorkedHours}
          format={format}
        />{" "}
        Hrs
      </div>
      <div className="flex items-center gap-2">
        <p className=" font-semibold">Remaining </p>
        <NumberFlow
          willChange
          continuous
          value={totalScheduledHours - totalWorkedHours}
          format={format}
        />{" "}
        Hrs
      </div>
      <div className="flex items-center gap-2">
        <p className=" font-semibold">Overtime :</p>
        <NumberFlow willChange continuous value={overtime} format={format} />{" "}
        Hrs
      </div>
    </>
  );
}
