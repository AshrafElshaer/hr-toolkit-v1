import Main from "@/components/main";
import { Button } from "@toolkit/ui/button";
import { Skeleton } from "@toolkit/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export default function LoadingNewEmployee() {
  return (
    <Main className="flex flex-col gap-4 h-auto">
      <Button
        variant="secondary"
        className="items-center gap-1 w-fit font-medium"
        disabled
      >
        <ChevronLeft className="size-4" />
        <span>Back</span>
      </Button>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Side */}
        <section className="flex flex-col justify-start items-start gap-4 basis-1/3">
          <Skeleton className="h-6 w-48" />
          <div className="flex flex-col md:flex-row flex-wrap w-full gap-2">
            {[...Array(6)].map((_, index) => (
              <div
                key={index.toString()}
                className="flex-1 min-w-[calc(50%-0.25rem)]"
              >
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Right Side */}
        <div className="flex flex-col gap-4 basis-2/3">
          {/* Address */}
          <div className="space-y-2 rounded-md col-span-2">
            <Skeleton className="h-6 w-36 mb-2" />
            <div className="flex flex-col md:flex-row gap-2">
              {[...Array(4)].map((_, index) => (
                <div key={index.toString()} className="w-full">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 mb-2" />
            <div className="flex flex-col md:flex-row gap-2">
              {[...Array(4)].map((_, index) => (
                <div key={index.toString()} className="w-full">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <section className="rounded-md">
        <Skeleton className="h-6 w-48 mb-2" />
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          {[...Array(4)].map((_, index) => (
            <div key={index.toString()} className="w-full">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {[...Array(4)].map((_, index) => (
            <div key={index.toString()} className="w-full">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="w-full mt-2">
          <Skeleton className="h-4 w-36 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </section>

      <Skeleton className="h-10 w-24 ml-auto" />
    </Main>
  );
}
