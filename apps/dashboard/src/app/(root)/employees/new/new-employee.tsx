"use client";

import UploadZone from "@/components/upload-zone";
import { createEmployeeSchema } from "@toolkit/supabase/validations";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import type { DropzoneOptions } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { formatBytes } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof createEmployeeSchema>>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      id: uuidv4(),
      avatar_url: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date_of_birth: "",
      gender: "",
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
    },
  });
  console.log(form.getValues());

  function onSubmit(values: z.infer<typeof createEmployeeSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleOnDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setImage(acceptedFiles[0]);
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      form.setValue("avatar_url", imageUrl);
    }
  };

  const handleOnDropRejected: DropzoneOptions["onDropRejected"] = (
    rejectedFiles,
  ) => {
    console.log(rejectedFiles);
    for (const file of rejectedFiles) {
      for (const error of file.errors) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-grow flex flex-col  gap-4"
      >
        {/* Wrapper */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Left Side */}

          <div className="flex flex-col justify-start items-start gap-4 basis-1/3">
            <div className="flex items-start gap-2">
              <UploadZone
                options={createUploadZoneOptions(
                  handleOnDrop,
                  handleOnDropRejected,
                )}
                className=" size-16 rounded-md  flex items-center justify-center text-secondary-foreground"
              >
                {form.watch("avatar_url") ? (
                  <Image
                    src={form.watch("avatar_url")}
                    alt="employee"
                    className="size-full rounded-md"
                    layout="fill"
                  />
                ) : (
                  <ImagePlus className="size-16 " />
                )}
              </UploadZone>

              {!form.watch("avatar_url") ? (
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
                      URL.revokeObjectURL(form.getValues("avatar_url"));
                      form.setValue("avatar_url", "");
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

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
                      {/* @ts-ignore */}
                      <Input placeholder="1234567890" {...field} />
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
                      {/* @ts-ignore */}
                      <Input placeholder="1990-01-01" {...field} />
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
                      {/* @ts-ignore */}
                      <Input placeholder="Male" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Right Side */}
          <div className="flex flex-col gap-4 basis-2/3">
            {/* Address */}
            <div className=" space-y-2  rounded-md col-span-2">
              <h3 className="text-lg font-medium text-secondary-foreground">
                Main Address
              </h3>
              <div className="flex  flex-col md:flex-row  gap-2">
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
                        <Input placeholder="1234 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row  gap-2">
                <div className="flex flex-col sm:flex-row  gap-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 Main St" {...field} />
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
                          <Input placeholder="1234 Main St" {...field} />
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
                          <Input placeholder="1234 Main St" {...field} />
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
                          <Input placeholder="1234 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
                      <FormLabel>Contact Name</FormLabel>
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
                      <FormLabel>Contact Email</FormLabel>
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
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
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
                      <FormLabel>Contact Relation</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
        <div className=" gap-4  rounded-md  col-span-3 col-start-1 row-start-3">
          <h3 className="text-lg font-medium text-secondary-foreground">
            Employment Details
          </h3>
        </div>
      </form>
    </Form>
  );
}
