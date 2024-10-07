import { sendOtpAction } from "@/actions/auth/send-otp-action";
import { verifyOtpAction } from "@/actions/auth/verify-otp-action";

import type { ReactSetState } from "@/types";
import { Button } from "@toolkit/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@toolkit/ui/card";
import { cn } from "@toolkit/ui/cn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@toolkit/ui/input-otp";
import { AnimatePresence, motion } from "framer-motion";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCountdown } from "usehooks-ts";

interface OtpConfirmationProps {
  userEmail: string | null;
  setUserEmail: ReactSetState<string | null>;
}

export function OtpConfirmation({
  userEmail,
  setUserEmail,
}: OtpConfirmationProps) {
  const searchParams = useSearchParams();
  const [isError, setIsError] = useState(false);
  const [
    resendTimer,
    { resetCountdown: resetResendTimer, startCountdown: startResendTimer },
  ] = useCountdown({
    countStart: 59,
    intervalMs: 1000,
  });

  const { execute: verifyOtp, isExecuting: isVerifying } = useAction(
    verifyOtpAction,
    {
      onError: ({ error }) => {
        setIsError(true);
        toast.error(error.serverError, {
          description: "Please try to resend otp.",
        });
      },
    },
  );
  const { executeAsync: sendOtp, isExecuting: isResending } = useAction(
    sendOtpAction,
    {
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  useEffect(() => {
    startResendTimer();
  }, [startResendTimer]);

  async function onComplete(otp: string) {
    verifyOtp({ otpCode: otp, email: userEmail ?? "" });
  }

  async function resendOtp() {
    await sendOtp({ email: userEmail ?? "" });

    resetResendTimer();
    startResendTimer();
  }

  return (
    <Card className="flex flex-col items-center w-full max-w-sm pt-6">
      <CardHeader className="flex flex-col gap-2 items-center w-full">
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a one time pass code to{" "}
        </CardDescription>
        <CardDescription>
          <strong>{userEmail}</strong>
        </CardDescription>
        <Button
          className="text-secondary-foreground"
          onClick={() => {
            setUserEmail(null);
          }}
          variant="outline"
        >
          Wrong email --&gt; change it
        </Button>
      </CardHeader>
      <CardContent>
        <h2 className=" font-semibold text-center mb-6">
          Enter the pass code to sign in
        </h2>
        <InputOTP
          // eslint-disable-next-line jsx-a11y/no-autofocus -- This is an OTP input field
          autoFocus
          maxLength={6}
          onComplete={onComplete}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={() => {
            if (isError) {
              setIsError(false);
            }
          }}
          className={cn(isError && "animate-shake")}
        >
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className={cn(isError && "border-destructive ")}
            />
            <InputOTPSlot
              index={1}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={2}
              className={cn(isError && "border-destructive")}
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              index={3}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={4}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={5}
              className={cn(isError && "border-destructive")}
            />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter className="w-full grid ">
        <Button
          disabled={isVerifying || resendTimer !== 0 || isResending}
          onClick={resendOtp}
          variant="secondary"
        >
          <AnimatePresence initial={false} mode="wait">
            {!isVerifying && !isResending && resendTimer === 0 && (
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="resend-passcode"
                transition={{ duration: 0.2 }}
              >
                Resend Pass code
              </motion.span>
            )}
            {!isVerifying && !isResending && resendTimer !== 0 && (
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="resend-timer"
                transition={{ duration: 0.2 }}
              >
                {`Resend Pass code in ${resendTimer}s`}
              </motion.span>
            )}
            {isVerifying ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center w-full"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="verifying-otp"
                transition={{ duration: 0.2 }}
              >
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Verifying Pass code ...
              </motion.div>
            ) : null}
            {isResending ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center w-full"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="resending-passcode"
                transition={{ duration: 0.2 }}
              >
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Resending Pass Code ...
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Button>
      </CardFooter>
    </Card>
  );
}
