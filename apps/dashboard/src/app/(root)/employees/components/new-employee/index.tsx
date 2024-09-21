import { Button } from "@v1/ui/button";
import { PlusIcon } from "lucide-react";

export default function NewEmployee() {
  return (
    <section className="flex justify-end">
      <Button variant="outline">
        <PlusIcon className="size-4 mr-2" />
        New Employee
      </Button>
    </section>
  );
}
