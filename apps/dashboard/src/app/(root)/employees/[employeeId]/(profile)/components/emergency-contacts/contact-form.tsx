"use client";

import {
  deleteEmergencyContactAction,
  updateEmergencyContactAction,
} from "@/actions/emergency-contacts.actions";
import { PhoneInput } from "@/components/phone-input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EmergencyContact } from "@toolkit/supabase/types";
import { emergencyContactsUpdateSchema } from "@toolkit/supabase/validations";
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
import type * as RPNInput from "react-phone-number-input";
import { toast } from "sonner";
import type { z } from "zod";

type Props = {
  contact: EmergencyContact;
  contactsLength: number;
};

export default function ContactForm({ contact, contactsLength }: Props) {
  const { execute: updateContact, isExecuting: isUpdating } = useAction(
    updateEmergencyContactAction,
    {
      onSuccess: ({ data }) => {
        toast.success("Emergency contact updated successfully");
        form.reset({
          contact_name: data?.contact_name,
          contact_relation: data?.contact_relation,
          contact_number: data?.contact_number,
          contact_email: data?.contact_email,
        });
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const { execute: deleteContact, isExecuting: isDeleting } = useAction(
    deleteEmergencyContactAction,
    {
      onSuccess: () => {
        toast.success("Emergency contact deleted successfully");
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const form = useForm<z.infer<typeof emergencyContactsUpdateSchema>>({
    resolver: zodResolver(emergencyContactsUpdateSchema),
    defaultValues: {
      contact_name: contact.contact_name,
      contact_relation: contact.contact_relation,
      contact_number: contact.contact_number,
      contact_email: contact.contact_email,
    },
  });

  function onSubmit(values: z.infer<typeof emergencyContactsUpdateSchema>) {
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

    updateContact({
      id: contact.id,
      ...payload,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 border-b last:border-b-0 pb-4 last:pb-0"
      >
        <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
          <FormField
            control={form.control}
            name="contact_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_relation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <FormControl>
                  <Input placeholder="Spouse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    onChange={(value: RPNInput.Value) => {
                      field.onChange(value);
                    }}
                    value={field.value as RPNInput.Value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.formState.isDirty && (
          <div className="flex justify-end items-center gap-2">
            {contactsLength > 1 ? (
              <Button
                type="button"
                onClick={() =>
                  deleteContact({
                    id: contact.id,
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
