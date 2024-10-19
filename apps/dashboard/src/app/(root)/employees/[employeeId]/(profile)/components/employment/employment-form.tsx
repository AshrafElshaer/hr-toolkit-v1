"use client";

import { updateEmployeeAction } from "@/actions/employees.actions";
import { DepartmentSelector } from "@/components/selectors/department-selector";
import { WorkingDaysSelector } from "@/components/selectors/working-days-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DepartmentMember,
  EmploymentTypeEnum,
  type User,
  UserRolesEnum,
} from "@toolkit/supabase/types";
import {
  departmentMemberUpdateSchema,
  userUpdateSchema,
} from "@toolkit/supabase/validations";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@toolkit/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@toolkit/ui/toggle-group";
import { CircleDollarSign, Clock, Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

type Props = {
  user: User;
  departmentMember: DepartmentMember;
};

const employmentUpdateSchema = userUpdateSchema.merge(
  departmentMemberUpdateSchema,
);

export default function EmploymentForm({ user, departmentMember }: Props) {
  const { execute: updateEmployment, isExecuting: isUpdating } = useAction(
    updateEmployeeAction,
    {
      onSuccess: ({ data }) => {
        toast.success("Employment details updated successfully");
        form.reset({
          job_title: data?.job_title,
          department_id: data?.department_id,
          role: data?.role,
          hire_date: data?.hire_date,
          employment_status: data?.employment_status,
          employment_type: data?.employment_type,
          work_hours_per_week: data?.work_hours_per_week,
          salary_per_hour: data?.salary_per_hour,
          working_days_per_week: data?.working_days_per_week,
        });
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const form = useForm<z.infer<typeof employmentUpdateSchema>>({
    resolver: zodResolver(employmentUpdateSchema),
    defaultValues: {
      job_title: user.job_title,
      department_id: departmentMember.department_id,
      role: user.role,
      hire_date: user.hire_date,
      employment_status: user.employment_status,
      employment_type: user.employment_type,
      working_days_per_week: user.working_days_per_week,
      work_hours_per_week: user.work_hours_per_week,
      leave_date: user.leave_date,
      salary_per_hour: user.salary_per_hour,
    },
  });

  function onSubmit(values: z.infer<typeof employmentUpdateSchema>) {
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

    updateEmployment({
      ...payload,
      user_id: user.id,
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
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Software Engineer"
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
            name="department_id"
            render={({ field }) => (
              <FormItem className="min-w-fit w-full">
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <DepartmentSelector
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(UserRolesEnum).map((role) => (
                        <SelectItem
                          key={role}
                          value={role}
                          className="capitalize"
                        >
                          {role.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hire_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hire Date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      field.onChange(date?.toISOString());
                    }}
                    mode="single"
                    fromDate={new Date()}
                    className="w-full mt-0"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="leave_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Leave Date
                  <span className="text-xs text-muted-foreground ml-1">
                    (Optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <DatePicker
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
            name="employment_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(EmploymentTypeEnum).map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="work_hours_per_week"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Work Hours / Week</FormLabel>
                <FormControl>
                  <Input
                    placeholder="40"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={
                      Number.isNaN(field.value)
                        ? ""
                        : field?.value?.toString() ?? ""
                    }
                    startIcon={Clock}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary_per_hour"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Salary / Hour</FormLabel>
                <FormControl>
                  <Input
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={
                      field.value && Number.isNaN(field.value)
                        ? ""
                        : field?.value?.toString() ?? ""
                    }
                    startIcon={CircleDollarSign}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="working_days_per_week"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Working Days / Week</FormLabel>
              <FormControl>
                <WorkingDaysSelector
                  value={field.value ?? []}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <div className="flex justify-end items-center gap-2">
            <Button
              type="button"
              onClick={() => {
                form.reset();
              }}
              variant="warning"
              size="sm"
              className="w-full sm:w-fit"
              disabled={isUpdating}
            >
              Discard
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-fit"
              disabled={isUpdating}
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
