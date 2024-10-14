import { Search } from "lucide-react";

import InputLoader from "@/components/loaders/input.loader";
import { PaginationLoader } from "@/components/loaders/pagination-loader";
import { TableLoader } from "@/components/loaders/table-loader";
import Main from "@/components/main";
import { Button } from "@toolkit/ui/button";
import { Skeleton } from "@toolkit/ui/skeleton";
import { PlusIcon } from "lucide-react";

const columns = [
  <div className="min-w-24" key="name">
    Name
  </div>,
  <div className="min-w-44" key="description">
    Description
  </div>,
  <div className="min-w-44" key="manager">
    Manager
  </div>,
  <div className="min-w-16" key="members">
    Members
  </div>,
  <div className="min-w-8" key="actions" />,
];

export default function DepartmentsLoading() {
  return (
    <Main className="flex flex-col gap-4" isMaxHeight>
      <section className="flex flex-col md:flex-row gap-4 items-center justify-start w-full">
        <div className="flex items-center md:max-w-52 w-full order-2 md:order-1">
          <InputLoader placeholder="Search by name..." startIcon={Search} />
        </div>

        <Button
          className="ml-auto w-full md:w-fit min-w-fit order-1 md:order-3"
          variant="secondary"
          disabled
        >
          <PlusIcon className="size-4 mr-2" />
          Add Department
        </Button>
      </section>
      <TableLoader columns={columns} />
      <PaginationLoader />
    </Main>
  );
}
