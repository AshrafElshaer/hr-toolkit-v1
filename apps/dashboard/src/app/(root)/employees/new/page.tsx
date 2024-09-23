import Main from "@/components/main";
import { buttonVariants } from "@v1/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NewEmployeePage() {
  return (
    <Main>
      <Link
        href="/employees"
        className={buttonVariants({
          variant: "secondary",
          className: "items-center",
        })}
      >
        <ArrowLeft className="size-4 mr-2" />
        Back
      </Link>
    </Main>
  );
}
