import { ToggleGroup, ToggleGroupItem } from "@toolkit/ui/toggle-group";

const DAYS_OF_WEEK = [
  {
    label: "Monday",
    value: "1",
  },
  {
    label: "Tuesday",
    value: "2",
  },
  {
    label: "Wednesday",
    value: "3",
  },
  {
    label: "Thursday",
    value: "4",
  },
  {
    label: "Friday",
    value: "5",
  },
  {
    label: "Saturday",
    value: "6",
  },
  {
    label: "Sunday",
    value: "7",
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
