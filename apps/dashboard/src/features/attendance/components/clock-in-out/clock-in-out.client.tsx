"use client";
import useCurrentTimezone from "@/features/user/hooks/use-current-timezone";
import useCurrentTime from "@/hooks/use-current-time";
import { calcWorkedTime } from "@/lib/date";
import NumberFlow from "@number-flow/react";
import {
  type TimeSheet,
  type TimeSheetBreak,
  TimeSheetStatusEnum,
} from "@toolkit/supabase/types";
import { Button } from "@toolkit/ui/button";
import { Card } from "@toolkit/ui/card";
import { Loader } from "lucide-react";
import moment from "moment";
import {
  clockInAction,
  clockOutAction,
  endBreakAction,
  takeBreakAction,
} from "../../lib/attendance.actions";

import { useAction } from "next-safe-action/hooks";
import React from "react";
import { toast } from "sonner";

type Props = {
  currentTimeSheet: TimeSheet | null;
  currentBreaks: TimeSheetBreak[] | null;
};

export default function ClockInOutClient({
  currentTimeSheet,
  currentBreaks,
}: Props) {
  const currentTimezone = useCurrentTimezone();
  const isClockedIn =
    currentTimeSheet?.status === TimeSheetStatusEnum.clocked_in;

  const isOnBreak = currentBreaks?.some((breakItem) => !breakItem.break_end);

  const { hoursAndMinutes } = useCurrentTime({
    enabled: true,
  });

  let hours = null;
  let minutes = null;
  let seconds = null;

  if (isClockedIn && currentTimeSheet) {
    ({ hours, minutes, seconds } = calcWorkedTime(
      moment(currentTimeSheet.clock_in).toDate(),
      currentBreaks || [],
      moment().toDate(),
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
    <Card className="flex flex-col h-fit p-4 gap-4 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-semibold">Clock In/Out</h3>
        {isClockedIn && (
          <div className="text-sm flex items-center gap-2">
            <div className="flex items-center gap-1">
              <NumberFlow
                value={hours ?? 0}
                format={{ useGrouping: false }}
                aria-hidden
                animated
                className="pointer-events-none text-sm"
                willChange
              />
              <span>h</span>
            </div>

            <div className="flex items-center gap-1">
              <NumberFlow
                value={minutes ?? 0}
                format={{ useGrouping: false }}
                aria-hidden
                animated
                className="pointer-events-none text-sm"
                willChange
              />
              <span>m</span>
            </div>
            <div className="flex items-center gap-1">
              <NumberFlow
                value={seconds ?? 0}
                format={{ useGrouping: false }}
                aria-hidden
                animated
                className="pointer-events-none text-sm"
                willChange
              />
              <span>s</span>
            </div>
          </div>
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
              variant="destructive"
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
