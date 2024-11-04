import { DateRangeQuerySelector } from "@/components/data-range-quey";
import { FilterButtonsLoader } from "@/components/loaders/filter-buttons-loader";
import { PaginationLoader } from "@/components/loaders/pagination-loader";
import { TableLoader } from "@/components/loaders/table-loader";
import Main from "@/components/main";
import { HoursBreakdownLoading } from "@/features/attendance/components/widgets/hours-summary/hours-breakdown.loading";
import { Checkbox } from "@toolkit/ui/checkbox";

import { MdSignalWifiStatusbarConnectedNoInternet2 } from "react-icons/md";

const columns = [
  <div className="justify-between min-w-28" key="date">
    Date
  </div>,
  <div className="min-w-16" key="clock_in">
    Clock In
  </div>,
  <div className="min-w-16" key="clock_out">
    Clock Out
  </div>,
  <div className="min-w-14" key="worked_hours">
    Worked Hours
  </div>,
  <div className="min-w-16" key="status">
    Status
  </div>,
];

export default function AttendanceLoading() {
  return (
    <Main className="flex-grow flex flex-col gap-4" isMaxHeight>
      <HoursBreakdownLoading />
      <section className="flex flex-col md:flex-row-reverse gap-4 items-center justify-start w-full">
        <FilterButtonsLoader
          buttons={[
            {
              icon: MdSignalWifiStatusbarConnectedNoInternet2,
              label: "Status",
            },
          ]}
        />
        <DateRangeQuerySelector
          options={[]}
          disabled
          className="ml-auto w-fit"
        />
      </section>
      <TableLoader columns={columns} />
      <PaginationLoader />
    </Main>
  );
}
