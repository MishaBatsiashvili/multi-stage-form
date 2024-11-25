// src/components/ui/datepicker.tsx
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { FieldValues } from 'react-hook-form'
import { useFormField } from './form'
import { AlertCircle } from '@untitled-ui/icons-react'

type DatepickerProps = FieldValues & {
  disabled?: (date: Date) => boolean
  placeholder?: string
}

const Datepicker: React.FC<DatepickerProps> = ({
  field,
  disabled,
  placeholder = 'Pick a date',
}) => {
  const { error } = useFormField()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-11 w-full pl-3 text-left font-normal',
            error && 'border-red-500',
            !field.value && 'text-muted-foreground'
          )}
        >
          {field.value ? (
            format(field.value, 'PPP')
          ) : (
            <span>{placeholder}</span>
          )}

          <div className='ml-auto flex items-center [&_svg]:size-5'>
            {error && (
              <AlertCircle width={20} height={20} className="text-red-500 mr-2" />
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { Datepicker }
