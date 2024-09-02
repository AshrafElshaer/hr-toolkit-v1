import { AutoComplete, type Option } from "../autocomplete";

const TIMEZONES = Intl.supportedValuesOf("timeZone").map((tz) => ({
  value: tz,
  label: tz,
}));

type Props = {
  value: string;
  setValue: (val: Option) => void;
  isDisabled?: boolean;
};
export function TimezoneSelector({ value, setValue, isDisabled }: Props) {
  return (
    <AutoComplete
      options={TIMEZONES}
      emptyMessage="No results."
      placeholder="Select timezone"
      onValueChange={setValue}
      value={TIMEZONES.find((tz) => tz.value === value)}
      disabled={isDisabled}
    />
  );
}
