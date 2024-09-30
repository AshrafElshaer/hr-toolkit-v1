import { Button } from "@toolkit/ui/button";
import { cn } from "@toolkit/ui/cn";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@toolkit/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverContentWithoutPortal,
  PopoverTrigger,
} from "@toolkit/ui/popover";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import React from "react";
import type * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import type { CountrySelectProps } from "../phone-input";

export const CountrySelector = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange],
  );
  const countryName = options.find((x) => x.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn(" flex gap-1 w-full justify-between items-center")}
          disabled={disabled}
        >
          <span className="flex items-center truncate">
            <div className="bg-foreground/20 rounded-sm flex w-6 h-4">
              {value && <FlagComponent country={value} countryName={value} />}
            </div>
            <span className="ml-2">{countryName || "Select country"}</span>
          </span>
          <ChevronsUpDown className={`h-4 w-4 ${disabled ? "hidden" : ""}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[250px]" align="end" >
        <Command>
          <CommandInput placeholder="Search country..." className="p-3" />
          <CommandList className="h-[300px]">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.value)
                .map((option) => (
                  <CommandItem
                    className={"text-sm gap-2 p-2"}
                    key={option.value}
                    onSelect={() => {
                      handleSelect(option.value);
                      setOpen(false);
                    }}
                  >
                    <FlagComponent
                      country={option.value}
                      countryName={option.label}
                    />
                    <span>{option.label}</span>

                    <CheckIcon
                      className={`ml-auto h-4 w-4 ${
                        option.value === value ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span
      className={"inline object-contain w-6 h-4 overflow-hidden rounded-sm"}
    >
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
