import * as React from "react";
import { cn } from "../../utils";

import type { LucideIcon } from "lucide-react";
import { useBoolean } from "../../utils/useBoolean";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, isError, ...props }, ref) => {
    const { setFalse, setTrue, value: isFocused } = useBoolean(false);

    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className="w-full relative" onBlur={setFalse}>
        {StartIcon && (
          <div
            className={cn(
              "absolute left-2 top-1/2 transform -translate-y-1/2 transition-all",
              isFocused ? "text-primary/70" : "text-muted-foreground",
              isError ? "text-destructive" : "",
            )}
          >
            <StartIcon size={18} />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md  border bg-transparent px-3 py-1 text-base md:text-sm ui-transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ",
            startIcon ? "pl-8" : "",
            endIcon ? "pr-8" : "",
            isFocused ? "border-primary/70" : "border-border",
            isError ? "border-destructive" : "",
            className,
          )}
          ref={ref}
          onFocus={setTrue}
          onBlur={setFalse}
          {...props}
        />
        {EndIcon && (
          <div
            className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2",
              isFocused ? "text-primary/70" : "text-muted-foreground",
              isError ? "text-destructive" : "",
            )}
          >
            <EndIcon size={18} />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
