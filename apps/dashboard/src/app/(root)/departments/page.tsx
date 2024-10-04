import Main from "@/components/main";
import type { Metadata } from "next";  
import Departments from "./_components";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Departments",
  description: "Manage your departments",
};

export default function DepartmentsPage() {


  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <Suspense fallback={<div>Loading departments...</div>}>
        <Departments />
      </Suspense>
    </Main>
  );
}
