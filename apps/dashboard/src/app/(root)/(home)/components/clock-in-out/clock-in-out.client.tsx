"use client";
import {
  clockInAction,
  clockOutAction,
  endBreakAction,
  takeBreakAction,
} from "@/actions/timesheet";
import useCurrentTime from "@/hooks/use-current-time";
import { calcWorkedTime } from "@/lib/date";
import {
  type TimeSheet,
  type TimeSheetBreak,
  TimeSheetStatusEnum,
} from "@v1/supabase/types";
import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";
import { Loader } from "lucide-react";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { toast } from "sonner";

type Props = {
  currentTimeSheet?: TimeSheet;
  currentBreaks?: TimeSheetBreak[];
};

export default function ClockInOutClient({
  currentTimeSheet,
  currentBreaks,
}: Props) {
  const { hoursAndMinutes } = useCurrentTime();
  const isClockedIn =
    currentTimeSheet?.status === TimeSheetStatusEnum.clocked_in;

  const isOnBreak = currentBreaks?.some((breakItem) => !breakItem.break_end);

  let hours = null;
  let minutes = null;
  let seconds = null;

  if (isClockedIn) {
    ({ hours, minutes, seconds } = calcWorkedTime(
      currentTimeSheet?.clock_in || "",
      currentBreaks || [],
    ));
  }

  const { execute: clockIn, isExecuting: isClockingIn } = useAction(
    clockInAction,
    {
      onSuccess: ({ data }) => {
        toast.success(
          `You are clocked in at ${moment(data?.clock_in).format("h:mm A")}`,
        );
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const { execute: takeBreak, isExecuting: isTakingBreak } = useAction(
    takeBreakAction,
    {
      onSuccess: () => {
        toast.success("You are on break have fun!");
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );
  const { execute: endBreak, isExecuting: isEndingBreak } = useAction(
    endBreakAction,
    {
      onSuccess: () => {
        toast.success("You're break is over, Let's get back to work!");
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );
  const { execute: clockOut, isExecuting: isClockingOut } = useAction(
    clockOutAction,
    {
      onSuccess: ({ data }) => {
        toast.success(
          `You are clock out at ${moment(data?.clock_out).format("h:mm A")}`,
        );
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  return (
    <Card className="  flex flex-col h-fit p-4 gap-4 w-full  ">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-semibold">Clock In/Out</h3>
        {isClockedIn && (
          <p className="text-sm">
            {`${hours ? `${hours} h` : ""} ${minutes ? `${minutes} m` : ""} ${seconds} s`}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        {!isClockedIn ? (
          <Button
            className="w-full"
            onClick={() => clockIn()}
            disabled={isClockingIn}
          >
            {isClockingIn ? (
              <Loader className="size-4 mr-2 animate-spin" />
            ) : null}
            Clock In at {hoursAndMinutes}
          </Button>
        ) : (
          <div className="w-full flex items-center gap-2">
            <Button
              variant={isOnBreak ? "success" : "warning"}
              className="w-full"
              size="sm"
              disabled={isTakingBreak || isEndingBreak || isClockingOut}
              onClick={() =>
                isOnBreak
                  ? endBreak({
                      time_sheet_id: currentTimeSheet.id,
                    })
                  : takeBreak({
                      time_sheet_id: currentTimeSheet.id,
                    })
              }
            >
              {isTakingBreak || isEndingBreak ? (
                <Loader className="size-3 mr-2 animate-spin" />
              ) : null}
              {isOnBreak ? "Return" : "Break"}
            </Button>
            <Button
              className="w-full"
              size="sm"
              variant={"destructive"}
              onClick={() =>
                clockOut({
                  timeSheet: currentTimeSheet,
                  breaks: currentBreaks || [],
                })
              }
              disabled={isTakingBreak || isEndingBreak || isClockingOut}
            >
              {isClockingOut ? (
                <Loader className="size-3 mr-2 animate-spin" />
              ) : null}
              Clock Out
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
