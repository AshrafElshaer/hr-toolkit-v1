"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@toolkit/ui/dialog";

type DepartmentDialogProps = {
  children?: React.ReactNode;
  department?: Department;
};

export default function DepartmentDialog({
  children: trigger,
  department,
}: DepartmentDialogProps) {
  return (
    <Dialog>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {department ? "Edit" : "Add"} Department
          </DialogTitle>
          <DialogDescription>
            Manage your department details.
          </DialogDescription>
        </DialogHeader>
        <DepartmentForm />
      </DialogContent>
    </Dialog>
  );
}
import { zodResolver } from "@hookform/resolvers/zod";
import { departmentInsertSchema } from "@toolkit/supabase/validations";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { getManagersAction } from "@/actions/employees";
import { useSession } from "@/hooks/use-session";
import { useQuery } from "@tanstack/react-query";
import type { Department } from "@toolkit/supabase/types";
import { Avatar } from "@toolkit/ui/avatar";
import { Button } from "@toolkit/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Skeleton } from "@toolkit/ui/skeleton";
import { PlusIcon } from "lucide-react";

const formSchema = departmentInsertSchema.omit({
  organization_id: true,
});

function DepartmentForm() {
  const session = useSession();
  const { data: managers, isLoading } = useQuery({
    queryKey: ["managers"],
    queryFn: async () => {
      const result = await getManagersAction();

      if (result?.serverError) {
        throw new Error(result?.serverError);
      }
      console.log({ result });
      return result?.data?.map((manager) => manager.user);
    },
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      manager_id: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center  gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="IT" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Information Technology" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="manager_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Manager</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a manager" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <SelectItem
                        key={index.toString()}
                        disabled
                        value={index.toString()}
                      >
                        <div className="flex items-center gap-2">
                          <Skeleton className="w-4 h-4 rounded-full " />
                          <Skeleton className="w-20 h-4" />
                        </div>
                      </SelectItem>
                    ))
                  ) : managers?.length === 0 ? (
                    <SelectItem disabled value="">
                      No managers found
                    </SelectItem>
                  ) : (
                    managers?.map((manager) => (
                      <SelectItem key={manager?.id} value={manager?.id ?? ""}>
                        <div className="flex items-center gap-2 w-full">
                          <Avatar
                            size="small"
                            src={manager?.avatar_url ?? ""}
                            alt={manager?.first_name ?? ""}
                            initials={
                              (manager?.first_name?.[0] ?? "") +
                              (manager?.last_name?.[0] ?? "")
                            }
                            className="inline-block"
                          />
                          <span>
                            {manager?.first_name} {manager?.last_name}
                          </span>
                          {manager?.id === session?.user?.id ? (
                            <span className="text-xs text-secondary-foreground">
                              (You)
                            </span>
                          ) : null}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
