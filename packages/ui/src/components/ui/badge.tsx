import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "../../utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border border-primary  text-primary shadow ",
        secondary:
          "border border-secondary-foreground  text-secondary-foreground",
        destructive:
          "border border-destructive bg-destructive/15 text-destructive",
        outline: "text-foreground",
        success: "border border-success bg-success/15 text-success",
        warning: "border border-warning bg-warning/15 text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
