import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "../../utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: " bg-primary  text-primary-foreground shadow ",
        secondary: " bg-secondary  text-foreground border-0",
        destructive:
          "border-0 border-destructive bg-destructive/15 text-destructive",
        outline: "text-foreground border-secondary-foreground",
        success: "border-0  bg-success/15 text-success",
        warning: "border-0  bg-warning/15 text-warning",
        info: "border-0  bg-blue/15 text-blue",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
