import * as React from 'react'

import { cn } from '@/lib/utils'
import { useFormField } from './form'
import { AlertCircle } from 'lucide-react'

export type InputProps = React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { error } = useFormField()

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border bg-white px-3 py-1 text-base text-custom-surface-on-surface-variant shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-custom-outline-outline-focus-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            error && 'border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <AlertCircle
            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
            width={20}
            height={20}
          />
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
