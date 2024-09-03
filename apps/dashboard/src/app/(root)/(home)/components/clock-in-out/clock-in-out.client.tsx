"use client";
import useCurrentTime from '@/hooks/use-current-time';
import { Button } from '@v1/ui/button';
import { Card } from '@v1/ui/card'
import { Loader } from 'lucide-react';
import React from 'react'

export default function ClockInOutClient() {
	const { hoursAndMinutes } = useCurrentTime();
	const isClockedIn = false
		// currentAttendance?.status === AttendanceStatusEnum.clocked_in;

	const isOnBreak = false
  // Boolean(
	// 	currentAttendance?.break_start && !currentAttendance?.break_end,
	// );

	const isBreakDone = false
  // Boolean(
	// 	currentAttendance?.break_start && currentAttendance?.break_end,
	// );

	let hours = null;
	let minutes = null;
	let seconds = null;

	// if (isClockedIn) {
	// 	({ hours, minutes, seconds } = calcClockInTime(
	// 		currentAttendance?.clock_in || "",
	// 		currentAttendance?.break_start || "",
	// 		currentAttendance?.break_end || "",
	// 	));
	// }

	// const { execute: clockIn, isExecuting: isClockingIn } = useAction(
	// 	clockInAction,
	// 	{
	// 		onSuccess: ({ data }) => {
	// 			toast.success(
	// 				`You are clocked in at ${moment(data?.clock_in).format("HH:mm A")}`,
	// 			);
	// 		},
	// 		onError: ({ error }) => {
	// 			toast.error(error.serverError);
	// 		},
	// 	},
	// );

	// const { execute: takeBreak, isExecuting: isTakingBreak } = useAction(
	// 	takeBreakAction,
	// 	{
	// 		onSuccess: () => {
	// 			toast.success("You are on break have fun!");
	// 		},
	// 		onError: ({ error }) => {
	// 			toast.error(error.serverError);
	// 		},
	// 	},
	// );
	// const { execute: endBreak, isExecuting: isEndingBreak } = useAction(
	// 	endBreakAction,
	// 	{
	// 		onSuccess: () => {
	// 			toast.success("You are break is over, Let's get back to work!");
	// 		},
	// 		onError: ({ error }) => {
	// 			toast.error(error.serverError);
	// 		},
	// 	},
	// );
	// const { execute: clockOut, isExecuting: isClockingOut } = useAction(
	// 	clockOutAction,
	// 	{
	// 		onSuccess: ({ data }) => {
	// 			toast.success(
	// 				`You are clock out at ${moment(data?.clock_out).format("HH:mm A")}`,
	// 			);
	// 		},
	// 		onError: ({ error }) => {
	// 			toast.error(error.serverError);
	// 		},
	// 	},
	// );

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
						// onClick={() => clockIn()}
						// disabled={isClockingIn}
					>
						Clock In at {hoursAndMinutes}
					</Button>
				) : (
					<div className="w-full flex items-center gap-2">
						<Button
							variant={isOnBreak ? "success" : "warning"}
							className="w-full"
							size="sm"
							// disabled={
							// 	isTakingBreak || isBreakDone || isEndingBreak || isClockingOut
							// }
							// onClick={() =>
							// 	isOnBreak
							// 		? endBreak({
							// 				attendanceId: currentAttendance.id,
							// 			})
							// 		: takeBreak({
							// 				attendanceId: currentAttendance.id,
							// 			})
							// }
						>
							{/* {isTakingBreak || isEndingBreak ? (
								<Loader className="size-3 mr-2 animate-spin" />
							) : null} */}
							{isOnBreak ? "Return" : "Break"}
						</Button>
						<Button
							className="w-full"
							size="sm"
							variant={"destructive"}
							// onClick={() =>
							// 	clockOut({
							// 		attendanceId: currentAttendance.id,
							// 	})
							// }
							// disabled={isTakingBreak || isEndingBreak || isClockingOut}
						>
							{/* {isClockingOut ? (
								<Loader className="size-3 mr-2 animate-spin" />
							) : null} */}
							Clock Out
						</Button>
					</div>
				)}
			</div>
		</Card>
	);
}

export function calcClockInTime(
	clockInAt: string,
	breakStart: string,
	breakEnd: string,
) {
	const now = new Date();
	const clockInTime = new Date(clockInAt).getTime();
	const breakStartTime = breakStart ? new Date(breakStart).getTime() : 0;
	const breakEndTime = breakEnd ? new Date(breakEnd).getTime() : 0;

	let totalWorkTime: number;

	// If break has started but not ended, calculate up to the break start
	if (breakStart && !breakEnd) {
		totalWorkTime = breakStartTime - clockInTime;
	} else if (breakStart && breakEnd) {
		// If break has started and ended, exclude the break duration
		totalWorkTime =
			now.getTime() - clockInTime - (breakEndTime - breakStartTime);
	} else {
		// If no break, calculate time worked from clock-in to now
		totalWorkTime = now.getTime() - clockInTime;
	}

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
