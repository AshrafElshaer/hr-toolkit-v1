import { Card } from "@toolkit/ui/card";

import { Button } from "@toolkit/ui/button";
import { Label } from "@toolkit/ui/label";
import { Skeleton } from "@toolkit/ui/skeleton";
import { TbPhonePlus } from "react-icons/tb";

const inputs = ["Name", "Email", "Relationship", "Phone Number"];

export function EmergencyContactsLoading() {
  return (
    <Card className="flex flex-col gap-4 w-full p-4 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Emergency Contacts</h3>
        <Button variant="secondary" size="icon" disabled>
          <TbPhonePlus className="size-4" />
        </Button>
      </div>
      <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
        {inputs.map((input) => (
          <div className="space-y-2 w-full" key={input}>
            <Label>{input}</Label>
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    </Card>
  );
}
