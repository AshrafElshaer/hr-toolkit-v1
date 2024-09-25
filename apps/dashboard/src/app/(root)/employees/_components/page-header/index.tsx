import { buttonVariants } from "@toolkit/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function NewEmployee() {
  return (
    <section className="flex justify-end">
      <Link
        href="/employees/new"
        className={buttonVariants({ variant: "default" })}
      >
        <PlusIcon className="size-4 mr-2" />
        Add Employee
      </Link>
    </section>
  );
}
