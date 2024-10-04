"use client";

import { getDepartmentsAction } from "@/actions/departments.actions";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@toolkit/ui/select";
import { Skeleton } from "@toolkit/ui/skeleton";
type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function DepartmentSelector({ value, onChange }: Props) {
  const { data: departments, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const result = await getDepartmentsAction();
      return result?.data;
    },
  });

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full min-w-fit">
        <SelectValue placeholder="Select a department" />
      </SelectTrigger>
      <SelectContent className="min-w-fit">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                className="flex items-center gap-2 mb-2"
                key={index.toString()}
              >
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))
          : departments?.map((department) => (
              <SelectItem key={department.id} value={department.id}>
                {department.name} - {department.description}
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
  );
}
