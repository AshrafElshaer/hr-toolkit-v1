"use client";

import { createEmployeeAction } from "@/actions/employees.actions";
import UploadZone from "@/components/upload-zone";
import { EmploymentTypeEnum, UserRolesEnum } from "@toolkit/supabase/types";
import { createEmployeeSchema } from "@toolkit/supabase/validations";
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

import { updateUserByIdAction } from "@/actions/users.actions";
import { PhoneInputSimple } from "@/components/phone-input";
import { CountrySelector } from "@/components/selectors/country-selector";
import { DepartmentSelector } from "@/components/selectors/department-selector";
import { COUNTRIES } from "@/constants/countries";
import { createClient } from "@/lib/supabase/client";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
const DAYS_OF_WEEK = [
  {
    label: "Monday",
    value: "1",
  },
  {
    label: "Tuesday",
    value: "2",
  },
  {
    label: "Wednesday",
    value: "3",
  },
  {
    label: "Thursday",
    value: "4",
  },
  {
    label: "Friday",
    value: "5",
  },
  {
    label: "Saturday",
    value: "6",
  },
  {
    label: "Sunday",
    value: "7",
  },
];

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
        console.log(error);
      },
      onSuccess: ({ data }) => {
        toast.success(
          "Employee created successfully and email has been sent to the employee",
        );
      },
    },
  );

  const formSchema = createEmployeeSchema.omit({ id: true, avatar_url: true });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date_of_birth: "",
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
      employment_type: "full_time",
      hire_date: new Date().toISOString(),
      role: "staff",
      work_hours_per_week: 40,
      salary_per_hour: 0,
      working_days_per_week: [],
      leave_date: null,
    },
  });

  // console.log({ errors: form.formState.errors });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const result = await executeAsync({ employee: values });
    const supabase = createClient();
    const userId = result?.data?.user?.id;
    const organizationId = result?.data?.user?.user_metadata?.organization_id;
    if (image) {
      toast.promise(
        async () => {
          const { data, error } = await supabase.storage
            .from("avatars")
            .upload(`${organizationId}/${userId}`, image, {
              contentType: image.type,
              upsert: true,
            });
          console.log({ data, error });
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
        // updateUserByIdAction({
        //   id: userId,
        //   avatar_url: publicUrl,
        // }),
        {
          loading: "Uploading avatar",
          success: "Avatar uploaded successfully",
          error: ({ error }) => error?.serverError ?? "Error uploading avatar",
        },
      );
    }
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
          className="flex-grow flex flex-col  gap-4"
        >
          {/* Wrapper */}
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Left Side */}

            <section className="flex flex-col justify-start items-start gap-4 basis-1/3">
              {/* <div className="flex items-start gap-2">
              <UploadZone
                options={createUploadZoneOptions(
                  handleImageDrop,
                  handleImageDropRejected,
                )}
                className=" size-16 rounded-md  flex items-center justify-center text-secondary-foreground"
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="employee"
                    className="size-full rounded-md"
                    layout="fill"
                  />
                ) : (
                  <ImagePlus className="size-16 " />
                )}
              </UploadZone>

              {!imagePreview ? (
                <div className="flex flex-col  text-secondary-foreground">
                  <p className="text-sm font-medium text-foreground">
                    Profile Picture
                  </p>

                  <p className="text-xs">Accepts: .png, .jpg, .jpeg</p>
                  <p className="text-xs">Max image size: 1MBs</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
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
            </div> */}
              <h3 className="text-lg font-medium text-secondary-foreground">
                Personal Information
              </h3>

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
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="flex-1 min-w-[calc(50%-0.25rem)]">
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <DateField
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
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
            </section>
            {/* Right Side */}
            <div className="flex flex-col gap-4 basis-2/3">
              {/* Address */}
              <div className=" space-y-2  rounded-md col-span-2">
                <h3 className="text-lg font-medium text-secondary-foreground">
                  Main Address
                </h3>
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
                          {/* @ts-ignore */}
                          <Input placeholder="Suite, Floor, etc." {...field} />
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
                <h3 className="text-lg font-medium text-secondary-foreground">
                  Emergency Contacts
                </h3>
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
                          <Input
                            placeholder="john.doe@example.com"
                            {...field}
                          />
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
            </div>
          </div>

          {/* Employment Details */}
          <section className=" rounded-md  ">
            <h3 className="text-lg font-medium text-secondary-foreground mb-2">
              Employment Details
            </h3>
            <div className="flex flex-col md:flex-row  gap-2 mb-4">
              <FormField
                control={form.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem className="min-w-fit w-full">
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
                        value={field.value}
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
                        value={field.value}
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
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      value={field.value ?? []}
                      onValueChange={(value: string[]) => field.onChange(value)}
                      className="flex-wrap gap-2 justify-start"
                    >
                      {DAYS_OF_WEEK.map((day) => (
                        <ToggleGroupItem
                          key={day.value}
                          value={day.value}
                          className="h-8"
                        >
                          {day.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          {/* <h3 className="text-lg font-medium text-secondary-foreground mb-2 text-center">
          Upload Documents{" "}
          <span className=" text-sm text-secondary-foreground ml-1">
            (Optional)
          </span>
        </h3> */}
          {/* <UploadZone
          className="w-full h-72 flex flex-col  items-center justify-center gap-2"
          options={createUploadZoneOptions(
            handleImageDrop,
            handleImageDropRejected,
          )}
        >
          <FilePlus className="size-10 text-secondary-foreground" />
          <p className="text-sm text-secondary-foreground">
            Click to upload or drag and drop
          </p>
        </UploadZone> */}
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
