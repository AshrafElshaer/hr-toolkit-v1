"use client";
import { sendOtpAction } from "@/actions/auth/send-otp-action";
import LogoSVG from "@/components/logo-svg";
import type { ReactSetState } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, Mail } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface LoginFormProps {
  setUserEmail: ReactSetState<string | null>;
}

const signInSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export default function LoginForm({
  setUserEmail,
}: LoginFormProps): JSX.Element {
  const { execute, status, isExecuting } = useAction(sendOtpAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
    onSuccess: ({ data }) => {
      setUserEmail(data ?? null);
    },
  });
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signInSchema>): Promise<void> {
    execute({ email: values.email });
  }

  return (
    <Card className="flex flex-col items-center w-full max-w-sm pt-6">
      <CardHeader className="flex flex-col items-center w-full">
        <LogoSVG className="w-10 h-10 fill-foreground  mb-4" />
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full"
                      id="email"
                      inputMode="email"
                      isError={Boolean(form.formState.errors.email)}
                      placeholder="Email Address"
                      startIcon={Mail}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={isExecuting}
              type="submit"
              variant="secondary"
            >
              <AnimatePresence initial={false} mode="wait">
                {isExecuting ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center w-full"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key="loader"
                    transition={{ duration: 0.2 }}
                  >
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Emailing one time password ...
                  </motion.div>
                ) : status === "hasSucceeded" ? (
                  <motion.span
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key="text"
                    transition={{ duration: 0.2 }}
                  >
                    Email sent
                  </motion.span>
                ) : (
                  <motion.span
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key="text"
                    transition={{ duration: 0.2 }}
                  >
                    Continue
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="w-full text-sm grid p-4">
        <div className="w-full flex flex-col md:flex-row items-center">
          <p>By signing in you agree to - </p>
          <Button size="sm" variant="link">
            Terms & Conditions
          </Button>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center">
          <p>Need help ?!</p>
          <Button size="sm" variant="link">
            Contact Support
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
