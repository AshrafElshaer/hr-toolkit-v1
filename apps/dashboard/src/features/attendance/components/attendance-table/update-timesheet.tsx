import { zodResolver } from "@hookform/resolvers/zod";
import { Time } from "@internationalized/date";
import type { TimeSheet } from "@toolkit/supabase/types";
import { TimeSheetStatusEnum } from "@toolkit/supabase/types";
import { timeSheetUpdateSchema } from "@toolkit/supabase/validations";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@toolkit/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@toolkit/ui/select";
import { TimePicker } from "@toolkit/ui/time-picker";
import { useForm } from "react-hook-form";
import { TbClockEdit } from "react-icons/tb";

import { Button } from "@toolkit/ui/button";
import { DatePicker } from "@toolkit/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@toolkit/ui/form";
import { Input } from "@toolkit/ui/input";
import { Textarea } from "@toolkit/ui/textarea";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { updateTimeSheetAction } from "../../lib/attendance.actions";

type UpdateTimeSheetProps = {
  timeSheet: TimeSheet;
  children: React.ReactNode;
};

export function UpdateTimeSheet({ timeSheet, children }: UpdateTimeSheetProps) {
  const { executeAsync: updateTimeSheet, isExecuting } = useAction(
    updateTimeSheetAction,
    {
      onSuccess: () => {
        setOpen(false);
      },
    },
  );
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof timeSheetUpdateSchema>>({
    resolver: zodResolver(timeSheetUpdateSchema),
    defaultValues: timeSheet,
  });

  function onSubmit(data: z.infer<typeof timeSheetUpdateSchema>) {
    toast.promise(updateTimeSheet({ timeSheet: data }), {
      loading: "Updating record...",
      success: "Record updated successfully",
      error: ({ error }) => error?.serverError ?? "Failed to update record",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <TbClockEdit className="size-5 mr-2" />
            Update Time Sheet Record
          </DialogTitle>
          <DialogDescription>
            Make changes to time sheet record here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        disabled
                        date={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date?.toISOString());
                        }}
                        mode="single"
                        fromDate={new Date()}
                        className="w-full mt-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(TimeSheetStatusEnum).map((status) => (
                            <SelectItem
                              key={status}
                              value={status}
                              className="capitalize"
                            >
                              {status.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="clock_in"
                render={({ field }) => {
                  const hours = moment(field.value).get("hours");
                  const minutes = moment(field.value).get("minutes");
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Clock In</FormLabel>
                      <FormControl>
                        <TimePicker
                          // @ts-ignore
                          value={new Time(hours, minutes)}
                          onChange={(val) => {
                            const date = moment(field.value);
                            date.set("hours", val?.hour);
                            date.set("minutes", val?.minute);
                            field.onChange(date.toISOString());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="clock_out"
                render={({ field }) => {
                  const hours = moment(field.value).get("hours");
                  const minutes = moment(field.value).get("minutes");
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Clock Out</FormLabel>
                      <FormControl>
                        <TimePicker
                          // @ts-ignore
                          value={new Time(hours, minutes)}
                          onChange={(val) => {
                            const date = moment(field.value);
                            date.set("hours", val?.hour);
                            date.set("minutes", val?.minute);
                            field.onChange(date.toISOString());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ""} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button variant="outline" disabled={isExecuting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button size="sm" type="submit" disabled={isExecuting}>
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
