import InputLoader from "@/components/loaders/input.loader";
import Main from "@/components/main";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@toolkit/ui/button";

import { Skeleton } from "@toolkit/ui/skeleton";
import { PlusIcon, Search } from "lucide-react";
import { IoGrid, IoKeySharp } from "react-icons/io5";
import { MdSignalWifiStatusbarConnectedNoInternet2 } from "react-icons/md";

export default function EmployeesLoading() {
  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <section className="flex flex-col md:flex-row gap-4 items-center justify-start w-full">
        <div className="flex items-center md:max-w-52 w-full order-2 md:order-1">
          <InputLoader placeholder="Search by name..." startIcon={Search} />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-fit order-3 md:order-2 overflow-x-scroll scrollbar-hide">
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed"
            disabled
          >
            <IoGrid className="size-3 mr-2" />
            Department
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed"
            disabled
          >
            <MdSignalWifiStatusbarConnectedNoInternet2 className="size-3 mr-2" />
            Status
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed"
            disabled
          >
            <IoKeySharp className="size-3 mr-2" />
            Role
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed"
            disabled
          >
            <PlusCircledIcon className="size-3 mr-2" />
            Type
          </Button>
        </div>
        <Button
          className="ml-auto w-full md:w-fit min-w-fit order-1 md:order-3"
          disabled
        >
          <PlusIcon className="size-4 mr-2" />
          Add Employee
        </Button>
      </section>
      <div className="rounded-md border flex-grow overflow-x-scroll flex flex-col min-h-40">
        <Skeleton className="w-full h-12 rounded-none" />

        {[...Array(5)].map((_, index) => (
          <div
            className="flex items-center gap-6 w-full h-10 text-accent-foreground border-b"
            key={index.toString()}
          >
            <Skeleton className="min-w-24 w-full h-6" />
            <Skeleton className="min-w-40 w-full h-6" />
            <Skeleton className="min-w-40 w-full h-6" />
            <Skeleton className="min-w-32 w-full h-6" />
            <Skeleton className="min-w-14 w-full h-6" />
            <Skeleton className="min-w-14 w-full h-6" />
            <div className="min-w-8 flex items-center justify-center">
              <ChevronRightIcon className="size-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
        <Skeleton className="h-6 w-48" /> {/* Row selection info skeleton */}
        <div className="flex items-center space-x-6 lg:space-x-6 sm:ml-auto">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 md:flex"
              disabled
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" disabled>
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Skeleton className="h-8 w-16" /> {/* Page info skeleton */}
            <Button variant="outline" className="h-8 w-8 p-0" disabled>
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 md:flex"
              disabled
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Main>
  );
}
