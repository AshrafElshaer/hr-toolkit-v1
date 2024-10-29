// Dependencies: npm install lucide-react react-aria-components

"use client";

import { Minus, Plus } from "lucide-react";
import {
  Button,
  Group,
  Input,
  NumberField,
  type NumberFieldProps,
} from "react-aria-components";
import { cn } from "../../../utils";

export function NumberWithButtons({ className, ...props }: NumberFieldProps) {
  return (
    <NumberField {...props}>
      <Group
        className={cn(
          "relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border  text-sm shadow-sm shadow-black/[.04] ring-offset-background transition-shadow data-[focus-within]:border-primary/70 data-[disabled]:opacity-50 data-[focus-within]:outline-none ",
          className,
        )}
      >
        <Button
          slot="decrement"
          className="-ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-lg border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Minus size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
        <Input className="w-full grow bg-background px-3 py-2 text-center tabular-nums text-foreground focus:outline-none" />
        <Button
          slot="increment"
          className="-me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </Group>
    </NumberField>
  );
}
