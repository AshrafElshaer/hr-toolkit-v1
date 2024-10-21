import { Card } from "@toolkit/ui/card";

import { Button } from "@toolkit/ui/button";
import { Label } from "@toolkit/ui/label";
import { Skeleton } from "@toolkit/ui/skeleton";
import { MapPinPlus } from "lucide-react";

const inputs = [
  "Address 1",
  "Address 2",
  "City",
  "State",
  "Zip Code",
  "Country",
];
export async function AddressLoading() {
  return (
    <Card className="flex flex-col gap-4 w-full p-4 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Mailing Address</h3>
        <Button variant="secondary" size="icon" disabled>
          <MapPinPlus className="size-4" />
        </Button>
      </div>
      <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
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
