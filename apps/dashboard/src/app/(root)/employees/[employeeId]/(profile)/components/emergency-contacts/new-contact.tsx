"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type * as RPNInput from "react-phone-number-input";
import { toast } from "sonner";
import type { z } from "zod";

import { emergencyContactsInsertSchema } from "@toolkit/supabase/validations";
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
import { Loader, UserPlus } from "lucide-react";
import { TbPhonePlus } from "react-icons/tb";

import { createEmergencyContactAction } from "@/actions/emergency-contacts.actions";
import { PhoneInput } from "@/components/phone-input";

export function NewEmergencyContact({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isExecuting } = useAction(createEmergencyContactAction, {
    onSuccess: () => {
      toast.success("Emergency contact created successfully");
      form.reset();
      setIsOpen(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  const form = useForm<z.infer<typeof emergencyContactsInsertSchema>>({
    resolver: zodResolver(emergencyContactsInsertSchema),
    defaultValues: {
      contact_name: "",
      contact_relation: "",
      contact_number: "",
      contact_email: "",
      user_id: userId,
    },
  });

  function onSubmit(values: z.infer<typeof emergencyContactsInsertSchema>) {
    execute({
      ...values,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <TbPhonePlus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TbPhonePlus />
            Add New Emergency Contact
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
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
            </div>

            <div className="flex justify-end gap-2">
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
