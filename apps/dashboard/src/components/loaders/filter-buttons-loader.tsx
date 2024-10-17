import { Button } from "@toolkit/ui/button";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

interface FilterButton {
  icon: IconType | LucideIcon;
  label: string;
}

interface FilterButtonsLoaderProps {
  buttons: FilterButton[];
}

export function FilterButtonsLoader({ buttons }: FilterButtonsLoaderProps) {
  return (
    <div className="flex items-center space-x-2 w-full md:w-fit order-3 md:order-2 overflow-x-scroll scrollbar-hide">
      {buttons.map((button, index) => (
        <Button
          key={button.label}
          variant="outline"
          size="sm"
          className="h-8 border-dashed"
          disabled
        >
          {button.icon && <button.icon className="size-3 mr-2" />}
          {button.label}
        </Button>
      ))}
    </div>
  );
}
