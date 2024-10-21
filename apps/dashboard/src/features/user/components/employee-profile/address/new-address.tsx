"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as RPNInput from "react-phone-number-input";
import { toast } from "sonner";
import type { z } from "zod";

import { addressesInsertSchema } from "@toolkit/supabase/validations";
import { Button } from "@toolkit/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@toolkit/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@toolkit/ui/form";
import { Input } from "@toolkit/ui/input";
import { Loader, MapPinPlus, Pin, Plus } from "lucide-react";

import { CountrySelector } from "@/components/selectors/country-selector";
import { COUNTRIES } from "@/constants/countries";
import { createAddressAction } from "@/features/user/actions/address.action";

export function NewAddress({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isExecuting } = useAction(createAddressAction, {
    onSuccess: () => {
      toast.success("Address created successfully");
      form.reset();
      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const form = useForm<z.infer<typeof addressesInsertSchema>>({
    resolver: zodResolver(addressesInsertSchema),
    defaultValues: {
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      user_id: userId,
    },
  });
  function onSubmit(values: z.infer<typeof addressesInsertSchema>) {
    execute({
      ...values,
      revalidateUrl: `/employees/${userId}`,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <MapPinPlus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPinPlus />
            Add New Address
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="address_1"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Address 1</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address_2"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>
                    Address 2
                    <span className="text-xs text-muted-foreground ml-1">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apt 4B"
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="10001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountrySelector
                      onChange={(value: string) => {
                        field.onChange(value);
                      }}
                      value={field.value as RPNInput.Country}
                      options={COUNTRIES}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 sm:col-span-2">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isExecuting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isExecuting}>
                {isExecuting ? (
                  <Loader className="animate-spin size-4 mr-2" />
                ) : null}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
