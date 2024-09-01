import type { ReactSetState } from "@/types";
import { Button } from "@v1/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@v1/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@v1/ui/input-otp";
import { AnimatePresence, motion } from "framer-motion";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useBoolean, useCountdown } from "usehooks-ts";
// import { sendOtpEmail } from "../actions/send-otp-email";
// import { verifyOtp } from "../actions/verify-otp";

interface OtpConfirmationProps {
  userEmail: string | null;
  setUserEmail: ReactSetState<string | null>;
}

export function OtpConfirmation({
  userEmail,
  setUserEmail,
}: OtpConfirmationProps) {
  const [
    resendTimer,
    { resetCountdown: resetResendTimer, startCountdown: startResendTimer },
  ] = useCountdown({
    countStart: 59,
    intervalMs: 1000,
  });
  const {
    value: isVerifying,
    setFalse: setIsVerifyingFalse,
    setTrue: setIsVerifyingTrue,
  } = useBoolean(false);
  const {
    value: isResending,
    setFalse: setIsResendingFalse,
    setTrue: setIsResendingTrue,
  } = useBoolean(false);

  useEffect(() => {
    startResendTimer();
  }, [startResendTimer]);

  async function onComplete(otp: string) {
    setIsVerifyingTrue();
    // const result = await verifyOtp({
    //   email: userEmail ?? "",
    //   otpCode: otp,
    // });
    // setIsVerifyingFalse();

    // if (result?.serverError) {
    //   toast.error(result.serverError, {
    //     position: "top-center",
    //   });
    //   return;
    // }
    // if (result?.validationErrors) {
    //   toast.error("Error verifying OTP:", {
    //     description:
    //       (result?.validationErrors?.email?._errors?.at(0) ||
    //         result?.validationErrors?.otpCode?._errors?.at(0)) ??
    //       "",
    //     position: "top-center",
    //   });
    //   return;
    // }
    // if (result?.data) {
    //   toast.success("OTP verified successfully", {
    //     position: "top-center",
    //   });
    // }
    return;
  }

  async function resendOtp() {
    setIsResendingTrue();

    // const result = await sendOtpEmail({
    //   email: userEmail ?? "",
    // });

    // if (result?.serverError) {
    //   toast.error(result.serverError, {
    //     description: "Try to resend the pass code ",
    //     position: "top-center",
    //   });
    //   setIsResendingFalse();
    //   resetResendTimer();
    //   return;
    // }
    // if (result?.validationErrors) {
    //   toast.error("Invalid email address", {
    //     position: "top-center",
    //   });
    //   setIsResendingFalse();
    //   resetResendTimer();
    //   return;
    // }
    // if (result?.data) {
    //   setUserEmail(result.data);
    // }
    setIsResendingFalse();
    resetResendTimer();
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
          className="text-secondary-foreground/70"
          onClick={() => {
            setUserEmail(null);
          }}
          size="sm"
          variant="outline"
        >
          Wrong email -&gt; change it
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
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
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
