import Main from "@/components/main";
import type { Metadata } from "next";  
import Departments from "./_components";

export const metadata: Metadata = {
  title: "Departments",
  description: "Manage your departments",
};

export default function DepartmentsPage() {


  return (
    <Main>
      <Departments />
    </Main>
  );
}
