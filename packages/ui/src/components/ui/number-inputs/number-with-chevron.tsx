// Dependencies: npm install lucide-react react-aria-components

"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Button,
  Group,
  Input,
  NumberField,
  type NumberFieldProps,
} from "react-aria-components";
import { cn } from "../../../utils";

export function NumberWithChevron({ className, ...props }: NumberFieldProps) {
  return (
    <NumberField {...props}>
      <Group
        className={cn(
          "relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border  text-sm shadow-sm shadow-black/[.04] ring-offset-background transition-shadow data-[focus-within]:border-primary/70 data-[disabled]:opacity-50 data-[focus-within]:outline-none ",
          className,
        )}
      >
        <Input className="flex-1 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none" />
        <div className="flex h-[calc(100%+2px)] flex-col">
          <Button
            slot="increment"
            className="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronUp size={12} strokeWidth={2} aria-hidden="true" />
          </Button>
          <Button
            slot="decrement"
            className="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </Group>
    </NumberField>
  );
}
