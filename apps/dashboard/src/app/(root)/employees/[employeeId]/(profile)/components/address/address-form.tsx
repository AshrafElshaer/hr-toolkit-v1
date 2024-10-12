"use client";
import { updateAddressAction } from "@/actions/address.action";
import { updateUserByIdAction } from "@/actions/users.actions";
import { CountrySelector } from "@/components/selectors/country-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Address } from "@toolkit/supabase/types";
import { addressUpdateSchema } from "@toolkit/supabase/validations";
import { Button } from "@toolkit/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@toolkit/ui/form";
import { Input } from "@toolkit/ui/input";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { COUNTRIES } from "@/constants/countries";
import type * as RPNInput from "react-phone-number-input";

type Props = {
  address: Address;
};

export default function AddressForm({ address }: Props) {
  const { execute, isExecuting } = useAction(updateAddressAction, {
    onSuccess: () => {
      toast.success("Address updated successfully");
      form.reset();
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const form = useForm<z.infer<typeof addressUpdateSchema>>({
    resolver: zodResolver(addressUpdateSchema),
    defaultValues: {
      address_1: address.address_1,
      address_2: address.address_2,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      country: address.country,
    },
  });

  function onSubmit(values: z.infer<typeof addressUpdateSchema>) {
    const dirtyFields = Object.keys(form.formState.dirtyFields);

    const payload = dirtyFields.reduce<Record<string, unknown>>(
      (acc, field) => {
        if (field in values) {
          acc[field] = values[field as keyof typeof values];
        }
        return acc;
      },
      {},
    );

    execute({
      id: address.id,
      revalidateUrl: `/employees/${address.user_id}`,
      ...payload,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
          <FormField
            control={form.control}
            name="address_1"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
        </div>

        {form.formState.isDirty ? (
          <div className="flex justify-end items-center gap-2">
            <Button
              type="button"
              onClick={() => {
                form.reset();
              }}
              variant="warning"
              size="sm"
              className="w-full sm:w-fit"
              disabled={isExecuting}
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-fit"
              disabled={isExecuting}
            >
              {isExecuting ? (
                <Loader className="animate-spin size-4 mr-2" />
              ) : null}
              Save
            </Button>
          </div>
        ) : null}
      </form>
    </Form>
  );
}
