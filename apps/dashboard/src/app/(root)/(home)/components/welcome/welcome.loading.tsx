import { Skeleton } from "@v1/ui/skeleton";

export function WelcomeMessageLoading() {
  return (
    <div className="flex flex-col gap-2 justify-center h-fit lg:col-span-3">
      <Skeleton className="h-8 w-52 " />
      <Skeleton className="h-4 w-72" />
    </div>
  );
}
