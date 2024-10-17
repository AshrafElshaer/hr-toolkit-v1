import Main from "@/components/main";
import type { Metadata } from "next";

import React from "react";
import NewEmployee from "./new-employee";

export const metadata: Metadata = {
  title: "New Employee",
  description: "Add a new employee",
};

export default function NewEmployeePage() {
  return (
    <Main className="flex flex-col gap-4 h-auto">
      <NewEmployee />
    </Main>
  );
}
