"use client";

import { createEmployeeSchema } from "@v1/supabase/validations";
import React from "react";

export default function NewEmployee() {
  return (
    <section className="flex-grow flex flex-col gap-4">
      <div className="flex  gap-4 ">
        <div className=" size-32 rounded-full border flex items-center justify-center">
          image
        </div>
        <div className="flex-1 border rounded-md p-4 w-full h-full">
          personal info
        </div>
      </div>

      <div className="flex-1 gap-4 border rounded-md p-4">
        emergency contact
      </div>
      <div className="flex-1 gap-4 border rounded-md p-4">address</div>

      <div className="flex-1 gap-4 border rounded-md p-4">employment info</div>
    </section>
  );
}
