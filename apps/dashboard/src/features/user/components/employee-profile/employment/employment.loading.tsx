import { Card } from "@toolkit/ui/card";
import { Label } from "@toolkit/ui/label";
import { Skeleton } from "@toolkit/ui/skeleton";

const inputs = [
  "Job Title",
  "Department",
  "Role",
  "Hire Date",
  "Employment Status",
  "Employment Type",
  "Work Hours Per Week",
  "Salary Per Hour",
  "Working Days Per Week",
];
export function EmploymentLoading() {
  return (
    <Card className="flex flex-col gap-4 w-full p-4 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Employment Details</h3>
      </div>
      <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {inputs.map((input, idx) =>
          idx !== inputs.length - 1 ? (
            <div className="space-y-2 w-full" key={input}>
              <Label>{input}</Label>
              <Skeleton className="h-9 w-full" />
            </div>
          ) : (
            <div className="space-y-2 w-full col-span-full" key={input}>
              <Label>{input}</Label>
              <div className="flex items-center gap-2">
                {Array.from({ length: 7 }).map((_, idx) => (
                  <Skeleton className="h-9 w-24" key={idx.toString()} />
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </Card>
  );
}
