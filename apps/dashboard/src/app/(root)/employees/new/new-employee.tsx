"use client";

import UploadZone from "@/components/upload-zone";
import { createEmployeeAction } from "@/features/user/actions/employees.actions";
import {
  EmploymentStatusEnum,
  EmploymentTypeEnum,
  UserRolesEnum,
} from "@toolkit/supabase/types";
import { employeeInsertSchema } from "@toolkit/supabase/validations";
import { DatePicker } from "@toolkit/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@toolkit/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@toolkit/ui/toggle-group";
import {
  ChevronLeft,
  CircleDollarSign,
  Clock,
  FilePlus,
  ImagePlus,
  Loader,
  X,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import React, { useState } from "react";
import type { DropzoneOptions } from "react-dropzone";
import type * as RPNInput from "react-phone-number-input";
import { toast } from "sonner";

import { PhoneInputSimple } from "@/components/phone-input";
import { CountrySelector } from "@/components/selectors/country-selector";
import { WorkingDaysSelector } from "@/components/selectors/working-days-selector";
import { COUNTRIES } from "@/constants/countries";
import { DepartmentSelector } from "@/features/departments/components/department-selector";
import { updateUserByIdAction } from "@/features/user/actions/users.actions";
import { createClient } from "@/lib/supabase/client";
import { uploadUserAvatar } from "@/lib/supabase/storage/upload";
import { formatBytes } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@toolkit/ui/button";
import { DateField } from "@toolkit/ui/date-field";
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
import { NumberWithButtons } from "@toolkit/ui/number-with-buttons";
import { NumberWithChevron } from "@toolkit/ui/number-with-chevron";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";

function createUploadZoneOptions(
  onDrop: DropzoneOptions["onDrop"],
  onDropRejected: DropzoneOptions["onDropRejected"],
): DropzoneOptions {
  return {
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: false,
    maxFiles: 1,
    onDrop,
    onDropRejected,
  };
}

export default function NewEmployee() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { executeAsync, status, isExecuting } = useAction(
    createEmployeeAction,
    {
      onError: ({ error }) => {
        toast.error(error?.serverError ?? "Something went wrong");
      },
      onSuccess: ({ data }) => {
        toast.success(
          "Employee created successfully and email has been sent to the employee",
        );
      },
    },
  );

  const formSchema = employeeInsertSchema.omit({
    id: true,
    avatar_url: true,
    user_id: true,
    organization_id: true,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date_of_birth: moment().subtract(18, "years").toDate().toISOString(),
      gender: "male",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zip_code: "",
      country: "US",
      contact_name: "",
      contact_email: "",
      contact_number: "",
      contact_relation: "",
      department_id: "",
      job_title: "",
      employment_type: EmploymentTypeEnum.full_time,
      employment_status: EmploymentStatusEnum.active,
      hire_date: new Date().toISOString(),
      role: UserRolesEnum.staff,
      work_hours_per_week: 40,
      salary_per_hour: 0,
      working_days_per_week: [],
      leave_date: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = await executeAsync({ employee: values });
    const supabase = createClient();
    const userId = result?.data?.user?.id;
    if (!userId) {
      toast.error("User ID not found");
      return;
    }
    if (image) {
      toast.promise(
        async () => {
          const { data, error } = await uploadUserAvatar(userId, image);

          if (error || !data) {
            throw new Error(error?.message ?? "Error uploading image");
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("avatars").getPublicUrl(data.path);

          const result = await updateUserByIdAction({
            id: userId,
            avatar_url: publicUrl,
          });

          if (result?.serverError) {
            throw new Error(result?.serverError);
          }

          return result?.data;
        },
        {
          loading: "Uploading avatar",
          success: "Avatar uploaded successfully",
          error: ({ error }) => error?.serverError ?? "Error uploading avatar",
        },
      );
    }

    router.push(`/employees/${userId}`);
  }

  const handleImageDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setImage(acceptedFiles[0]);
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setImagePreview(imageUrl);
    }
  };

  const handleImageDropRejected: DropzoneOptions["onDropRejected"] = (
    rejectedFiles,
  ) => {
    for (const file of rejectedFiles) {
      for (const error of file.errors) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        className="items-center gap-1 w-fit font-medium"
        onClick={() => router.back()}
      >
        <ChevronLeft className="size-4" />
        <span>Back</span>
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-grow flex flex-col  gap-4 max-w-4xl mx-auto"
        >
          {/* Profile Picture */}
          <section className="flex  flex-col  mx-auto justify-center items-center gap-4 ">
            <UploadZone
              options={createUploadZoneOptions(
                handleImageDrop,
                handleImageDropRejected,
              )}
              className=" size-24 rounded-md  flex items-center justify-center text-secondary-foreground"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="employee"
                  className="size-full rounded-md object-cover"
                  fill
                />
              ) : (
                <ImagePlus className="size-20 " />
              )}
            </UploadZone>

            {!imagePreview ? (
              <div className="flex flex-col  text-secondary-foreground">
                <p className="font-bold text-foreground mb-2">
                  Profile Picture
                </p>

                <p className="text-sm">Accepts: .png, .jpg, .jpeg</p>
                <p className="text-sm">Max image size: 1MBs</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 items-center">
                <p className="text-sm text-secondary-foreground">
                  <span className="font-medium text-foreground">
                    {image?.name}
                  </span>{" "}
                  {formatBytes(image?.size ?? 0)}
                </p>
                <Button
                  variant="destructive"
                  size="xs"
                  className="w-fit"
                  onClick={() => {
                    setImage(null);

                    setImagePreview((url) => {
                      if (url) {
                        URL.revokeObjectURL(url);
                      }
                      return null;
                    });
                  }}
                >
                  Remove
                </Button>
              </div>
            )}
          </section>

          <h3 className="font-bold ">Personal Information</h3>

          <div className="flex flex-col md:flex-row flex-wrap w-full gap-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[calc(50%-0.25rem)]">
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
                <FormItem className="flex-1 min-w-[calc(50%-0.25rem)]">
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
                <FormItem className="flex-1 min-w-[calc(50%-0.25rem)]">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[calc(50%-0.25rem)]">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInputSimple
                      onChange={(value: RPNInput.Value) => {
                        field.onChange(value);
                      }}
                      value={field.value as RPNInput.Value}
                      defaultCountry={form.watch("country") as RPNInput.Country}
                      country={form.watch("country") as RPNInput.Country}
                      disabled={!form.getValues().country}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[calc(50%-0.25rem)]">
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
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[calc(50%-0.25rem)]">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? undefined}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <div className=" space-y-2  rounded-md">
            <h3 className="font-bold">Main Address</h3>
            <section className="flex  flex-col md:flex-row  gap-2">
              <FormField
                control={form.control}
                name="address_1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Address 1</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 Main St" {...field} />
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
                      Address 2
                      <span className="text-xs text-secondary-foreground ml-1">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Suite, Floor, etc."
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <section className="flex flex-col md:flex-row  gap-2">
              <div className="flex flex-col sm:flex-row  gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="London" {...field} />
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
                        <Input placeholder="London" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row  gap-2">
                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
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
            </section>
          </div>
          {/* Emergency Contacts */}
          <div className="   space-y-2  ">
            <h3 className="font-bold">Emergency Contacts</h3>
            <div className="flex flex-col md:flex-row  gap-2">
              <FormField
                control={form.control}
                name="contact_name"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
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
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <PhoneInputSimple
                        onChange={(value: RPNInput.Value) => {
                          field.onChange(value);
                        }}
                        value={field.value as RPNInput.Value}
                        defaultCountry={
                          form.watch("country") as RPNInput.Country
                        }
                        country={form.watch("country") as RPNInput.Country}
                        disabled={!form.getValues().country}
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
                  <FormItem className="w-full">
                    <FormLabel>Relation</FormLabel>
                    <FormControl>
                      <Input placeholder="Brother" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Employment Details */}
          <section className=" rounded-md  space-y-2">
            <h3 className="font-bold">Employment Details</h3>
            <div className="flex flex-col md:flex-row  gap-2 mb-4">
              <FormField
                control={form.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem className="min-w-fit ">
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <DepartmentSelector
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job_title"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? undefined}
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
                name="employment_type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Employment Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? undefined}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select an employment type" />
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
            </div>
            <div className="flex flex-col md:flex-row md:items-center  gap-2">
              <FormField
                control={form.control}
                name="hire_date"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-2">
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
                      />
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
                      <NumberWithButtons
                        value={field.value ?? 0}
                        onChange={field.onChange}
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
                      <NumberWithChevron
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                        formatOptions={{
                          style: "currency",
                          currency: "USD",
                          currencySign: "accounting",
                        }}
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
                  <FormItem className="w-full flex flex-col gap-2">
                    <FormLabel>
                      Leave Date
                      <span className="text-xs text-secondary-foreground ml-1">
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
                        fromDate={
                          form.watch("hire_date") && form.getValues().hire_date
                            ? new Date(form.getValues().hire_date ?? "")
                            : new Date()
                        }
                        className="w-full mt-0"
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
                <FormItem className="w-full mt-2">
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
          </section>
          <Button
            type="submit"
            className="w-fit ml-auto"
            disabled={isExecuting}
          >
            {isExecuting ? (
              <Loader className="size-4 animate-spin mr-2" />
            ) : null}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
