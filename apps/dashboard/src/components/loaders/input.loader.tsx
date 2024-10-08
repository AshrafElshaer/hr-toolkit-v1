import { cn } from "@toolkit/ui/cn";
import type { LucideIcon } from "lucide-react";

type InputLoaderProps = {
  className?: string;
  placeholder?: string;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
};

export default function InputLoader({ className, placeholder, startIcon, endIcon }: InputLoaderProps) {
    const StartIcon = startIcon;
    const EndIcon = endIcon;
  return (
    <div className={cn("w-full relative cursor-not-allowed", className)}>
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 transition-all text-muted-foreground">
        {StartIcon && <StartIcon className="w-4 h-4" />}
      </div>
      <div className="flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-base md:text-sm pl-8 text-muted-foreground">
            {placeholder}
        
      </div>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        {EndIcon && <EndIcon className="w-4 h-4" />}
      </div>
    </div>
  );
}
