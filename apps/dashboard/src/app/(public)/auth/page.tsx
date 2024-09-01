"use client";
import { Button } from "@v1/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";
import LoginForm from "./components/login-form";
import { OtpConfirmation } from "./components/otp-confirmation";

export default function LoginPage(): JSX.Element {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const promise = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => reject({ name: "Sonner" }), 2000),
    );
  const { setTheme } = useTheme();

  return (
    <main className="grid place-items-center h-[100svh] p-4">
      <AnimatePresence mode="wait">
        {userEmail ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: 10 }}
            key="otp-confirmation"
            transition={{ duration: 0.2 }}
          >
            <OtpConfirmation
              setUserEmail={setUserEmail}
              userEmail={userEmail}
            />
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: 10 }}
            key="login-form"
            transition={{ duration: 0.2 }}
          >
            <LoginForm setUserEmail={setUserEmail} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
