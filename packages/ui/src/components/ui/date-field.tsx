import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { Input } from "./input";

interface DateFieldProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DateField({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
}: DateFieldProps) {
  const [dateString, setDateString] = React.useState(
    value ? format(value, "yyyy-MM-dd") : "",
  );

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setDateString(inputValue);

      if (inputValue) {
        const parsedDate = parse(inputValue, "yyyy-MM-dd", new Date());
        onChange(isValid(parsedDate) ? parsedDate : undefined);
      } else {
        onChange(undefined);
      }
    },
    [onChange],
  );

  const formattedValue = React.useMemo(() => {
    const digits = dateString.replace(/\D/g, "");
    const year = digits.slice(0, 4);
    const month = digits.slice(4, 6);
    const day = digits.slice(6, 8);

    if (year && month && day) {
      return `${year}-${month}-${day}`;
    }
    if (year && month) {
      return `${year}-${month}`;
    }
    if (year) {
      return year;
    }
    return "";
  }, [dateString]);

  return (
    <Input
      type="text"
      value={formattedValue}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
}
