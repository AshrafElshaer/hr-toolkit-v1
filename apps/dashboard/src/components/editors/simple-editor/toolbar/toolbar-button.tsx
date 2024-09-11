import * as React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@v1/ui/tooltip'
import { Toggle } from '@v1/ui/toggle'
import { cn } from '@v1/ui/cn'
import type { TooltipContentProps } from '@radix-ui/react-tooltip'

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<typeof Toggle> {
  isActive?: boolean
  tooltip?: string
  tooltipOptions?: TooltipContentProps
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ isActive, children, tooltip, className, tooltipOptions, ...props }, ref) => {
    const toggleButton = (
      <Toggle size="sm" ref={ref} className={cn('p-0 size-6 rounded-md', { 'bg-accent': isActive }, className)} {...props}>
        {children}
      </Toggle>
    )

    if (!tooltip) {
      return toggleButton
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
        <TooltipContent {...tooltipOptions} className="p-2">
          <div className="flex flex-col items-center text-center">{tooltip}</div>
        </TooltipContent>
      </Tooltip>
    )
  }
)

ToolbarButton.displayName = 'ToolbarButton'

export default ToolbarButton