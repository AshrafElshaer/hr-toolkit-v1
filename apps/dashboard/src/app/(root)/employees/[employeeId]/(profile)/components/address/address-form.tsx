"use client";
import {
  deleteAddressAction,
  updateAddressAction,
} from "@/actions/address.action";
import { updateUserByIdAction } from "@/actions/users.actions";
import { CountrySelector } from "@/components/selectors/country-selector";
import { COUNTRIES } from "@/constants/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Address } from "@toolkit/supabase/types";
import { addressesUpdateSchema } from "@toolkit/supabase/validations";
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
import { Separator } from "@toolkit/ui/separator";
import { Loader, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import type * as RPNInput from "react-phone-number-input";
import { toast } from "sonner";
import type { z } from "zod";

type Props = {
  address: Address;
  addressesLength: number;
};

export default function AddressForm({ address, addressesLength }: Props) {
  const { execute: updateAddress, isExecuting: isUpdating } = useAction(
    updateAddressAction,
    {
      onSuccess: ({ data }) => {
        toast.success("Address updated successfully");
        form.reset({
          address_1: data?.address_1,
          address_2: data?.address_2,
          city: data?.city,
          state: data?.state,
          zip_code: data?.zip_code,
          country: data?.country,
        });
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const { execute: deleteAddress, isExecuting: isDeleting } = useAction(
    deleteAddressAction,
    {
      onSuccess: () => {
        toast.success("Address deleted successfully");
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const form = useForm<z.infer<typeof addressesUpdateSchema>>({
    resolver: zodResolver(addressesUpdateSchema),
    defaultValues: {
      address_1: address.address_1,
      address_2: address.address_2,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      country: address.country,
    },
  });

  function onSubmit(values: z.infer<typeof addressesUpdateSchema>) {
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

    updateAddress({
      id: address.id,
      revalidateUrl: `/employees/${address.user_id}`,
      ...payload,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 border-b last:border-b-0 pb-4 last:pb-0"
      >
        <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
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

        {form.formState.isDirty && (
          <div className="flex justify-end items-center gap-2">
            {addressesLength > 1 ? (
              <Button
                type="button"
                onClick={() =>
                  deleteAddress({
                    id: address.id,
                    revalidateUrl: `/employees/${address.user_id}`,
                  })
                }
                variant="destructive"
                size="sm"
                className="sm:mr-auto w-full sm:w-fit"
                disabled={isDeleting || isUpdating}
              >
                {isDeleting && <Loader className="animate-spin size-4 mr-2" />}
                Delete
              </Button>
            ) : null}
            <Button
              type="button"
              onClick={() => {
                form.reset();
              }}
              variant="warning"
              size="sm"
              className="w-full sm:w-fit"
              disabled={isUpdating || isDeleting}
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-fit"
              disabled={isUpdating || isDeleting}
            >
              {isUpdating && <Loader className="animate-spin size-4 mr-2" />}
              Save
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
