"use client";

import { createOrganizationSchema } from "@/actions/organization/schema";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { Button } from "@v1/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCountdown } from "usehooks-ts";

export default function OrganizationOnboarding() {
  const [count, { startCountdown }] = useCountdown({
    countStart: 5,
    intervalMs: 1000,
  });
  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  return (
    <AnimatePresence mode="wait">
      {count !== 0 ? (
        <motion.div
          key={"welcome-message"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="flex-grow grid place-content-center p-4 w-full"
        >
          <TextGenerateEffect
            words="Great news! Your account has been set up successfully. Now, we need some information about your organization to complete the onboarding process."
            className="w-full"
          />
        </motion.div>
      ) : (
        <motion.div
          className="w-full"
          key={"onboarding-form"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <OrganizationForm />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as RPNInput from "react-phone-number-input";
import type { z } from "zod";

import { PhoneInputSimple } from "@/components/phone-input";
// import { capitalize } from "lodash";
import { CountrySelector } from "@/components/selectors/country-selector";
import { TimezoneSelector } from "@/components/selectors/timezone-selector";
import { COUNTRIES } from "@/constants/countries";
import { currentTimezone } from "@/lib/date";
import { OrganizationTypeEnum } from "@v1/supabase/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@v1/ui/select";

import { createOrganizationAction } from "@/actions/organization";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

 function OrganizationForm() {
  const router = useRouter();
  const { execute, status, isExecuting } = useAction(createOrganizationAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
    onSuccess: () => {
      router.push("/onboarding/congrats");
    },
  });
  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      type: OrganizationTypeEnum["for-profit"],
      address_1: "",
      address_2: null,
      city: "",
      state: "",
      zip_code: "",
      country: "US",
      contact_name: "",
      contact_email: "",
      contact_number: "",
      payroll_pattern: "monthly",
      payroll_start_day: 1,
      time_zone: currentTimezone(),
      website: null,
      logo_url: null,
    },
  });

  async function onSubmit(data: z.infer<typeof createOrganizationSchema>) {
    execute(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="full space-y-4">
        <h3 className="text-lg font-semibold text-secondary-foreground">
          Organization Information
        </h3>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="Space X" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Organization Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(OrganizationTypeEnum).map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="capitalize"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Website
                  <span className="text-muted-foreground"> (optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example.com"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time_zone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Timezone</FormLabel>
                <TimezoneSelector
                  value={field.value}
                  setValue={field.onChange}
                />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-lg font-semibold text-secondary-foreground">
          Mailing Address
        </h3>
        <FormField
          control={form.control}
          name="address_1"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main st" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_2"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Street Address 2
                <span className="text-muted-foreground"> (optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Suit 112"
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="CA" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="zip_code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Zip</FormLabel>
                <FormControl>
                  <Input placeholder="94107" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>

                <CountrySelector
                  onChange={(value: string) => {
                    form.setValue("country", value);
                  }}
                  value={field.value as RPNInput.Country}
                  options={COUNTRIES}
                />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="contact_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contact Number</FormLabel>

                <PhoneInputSimple
                  onChange={(value: RPNInput.Value) => {
                    field.onChange(value);
                  }}
                  value={field.value as RPNInput.Value}
                  defaultCountry={form.watch("country") as RPNInput.Country}
                  placeholder="(214) 876-7876"
                  disabled={!form.getValues().country}
                />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="payroll_pattern"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Payroll Pattern</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a pattern" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payroll_start_day"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Payroll Start Day</FormLabel>
                <Select
                  value={field.value.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40 ">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full grid place-content-e">
          <Button
            type="submit"
            className="ml-auto"
            disabled={isExecuting || status === "hasSucceeded"}
          >
            {isExecuting ? (
              <Loader className="size-4 animate-spin mr-2" />
            ) : null}
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
