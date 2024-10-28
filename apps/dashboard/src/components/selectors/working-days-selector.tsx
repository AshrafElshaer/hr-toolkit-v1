import { ToggleGroup, ToggleGroupItem } from "@toolkit/ui/toggle-group";

const DAYS_OF_WEEK = [
  {
    label: "Monday",
    value: "0",
  },
  {
    label: "Tuesday",
    value: "1",
  },
  {
    label: "Wednesday",
    value: "2",
  },
  {
    label: "Thursday",
    value: "3",
  },
  {
    label: "Friday",
    value: "4",
  },
  {
    label: "Saturday",
    value: "5",
  },
  {
    label: "Sunday",
    value: "6",
  },
];

export function WorkingDaysSelector({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      value={value ?? []}
      onValueChange={(value: string[]) => onChange(value)}
      className="flex-wrap gap-2 justify-start"
    >
      {DAYS_OF_WEEK.map((day) => (
        <ToggleGroupItem key={day.value} value={day.value} className="h-8">
          {day.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
