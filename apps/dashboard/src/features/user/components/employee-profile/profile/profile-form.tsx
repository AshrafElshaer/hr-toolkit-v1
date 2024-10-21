"use client";
import { PhoneInput } from "@/components/phone-input";
import { updateUserByIdAction } from "@/features/user/actions/users.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@toolkit/supabase/types";
import {
  userUpdateSchema,
} from "@toolkit/supabase/validations";
import { Button } from "@toolkit/ui/button";
import { DateField } from "@toolkit/ui/date-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@toolkit/ui/form";
import { Input } from "@toolkit/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@toolkit/ui/select";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import type * as RPNInput from "react-phone-number-input";
import { toast } from "sonner";
import type { z } from "zod";

type Props = {
  user: User;
};

export default function ProfileForm({ user }: Props) {
  const { execute, isExecuting } = useAction(updateUserByIdAction, {
    onSuccess: ({ data }) => {
      toast.success("User updated successfully");
      form.reset({
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        phone_number: data?.phone_number,
        date_of_birth: data?.date_of_birth,
        gender: data?.gender,
      });
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
    },
  });

  function onSubmit(values: z.infer<typeof userUpdateSchema>) {
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
      id: user.id,
      revalidateUrl: `/employees/${user.id}`,
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
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
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
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <DateField
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => {
                      field.onChange(date?.toISOString());
                    }}
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
                form.setValue("first_name", user.first_name);
                form.setValue("last_name", user.last_name);
                form.setValue("email", user.email);
                form.setValue("phone_number", user.phone_number);
                form.setValue("gender", user.gender);
                form.setValue("date_of_birth", user.date_of_birth);
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
