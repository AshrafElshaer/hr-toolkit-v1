import { Card } from "@toolkit/ui/card";
import { Label } from "@toolkit/ui/label";
import { Skeleton } from "@toolkit/ui/skeleton";

const inputs = [
  "First Name",
  "Last Name",
  "Email",
  "Phone Number",
  "Gender",
  "Date Of Birth",
];

export function ProfileLoading() {
  return (
    <Card className="flex flex-col gap-4 w-full p-4">
      <h3 className="font-bold text-lg">Personal Details</h3>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center min-w-fit">
          <Skeleton className="size-20 rounded-full" />
        </div>
        <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
          {inputs.map((input) => (
            <div className="space-y-2 w-full" key={input}>
              <Label>{input}</Label>
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
