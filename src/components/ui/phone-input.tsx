import { ChevronsUpDown, Search } from 'lucide-react'

import * as React from 'react'

import * as RPNInput from 'react-phone-number-input'

import flags from 'react-phone-number-input/flags'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input, InputProps } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { Virtuoso } from 'react-virtuoso'
import { motion } from 'motion/react'
import { useDebounce } from 'use-debounce'

type PhoneInputProps = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value' | 'ref'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void
  }

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn('flex', className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => {
            if (onChange && typeof value === 'string') {
              onChange(value)
            }
          }}
          {...props}
        />
      )
    }
  )
PhoneInput.displayName = 'PhoneInput'

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn(className)}
      {...props}
      placeholder="000-000-000"
      ref={ref}
    />
  )
)
InputComponent.displayName = 'InputComponent'

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  options: CountryEntry[]
  onChange: (country: RPNInput.Country) => void
}

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [debouncedSearchValue] = useDebounce(searchValue, 300)

  const modifiedCountryList = React.useMemo(
    () =>
      countryList.slice(1).map((ctry) => ({
        ...ctry,
        phonePrefix: '+' + RPNInput.getCountryCallingCode(ctry.value!),
      })),
    [countryList]
  )

  const filteredCountryList = React.useMemo(
    () =>
      modifiedCountryList.filter((ctry) => {
        return (
          ctry.value?.toLowerCase()?.includes(debouncedSearchValue.toLowerCase()) ||
          ctry.label?.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
          ctry.phonePrefix.includes(debouncedSearchValue)
        )
      }),
    [modifiedCountryList, debouncedSearchValue]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          className="mr-2 flex h-11 gap-1 rounded-xl px-3 focus:z-10"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          {selectedCountry ? (
            <span className="text-base md:text-sm text-custom-surface-on-surface-variant font-medium">{`+${RPNInput.getCountryCallingCode(selectedCountry)}`}</span>
          ) : (
            <span className="text-base md:text-sm text-custom-surface-on-surface-variant font-medium">+1</span>
          )}
          <ChevronsUpDown
            className={cn(
              '-mr-2 size-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <div className="flex items-center px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
          >
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <Virtuoso
                style={{ height: 4 * 72 }}
                totalCount={filteredCountryList.length}
                itemContent={(index) => {
                  if (filteredCountryList[index].value) {
                    return (
                      <CountrySelectOption
                        key={filteredCountryList[index].value}
                        country={filteredCountryList[index].value!}
                        countryName={filteredCountryList[index].label}
                        selectedCountry={selectedCountry}
                        onChange={onChange}
                      />
                    )
                  }

                  return <></>
                }}
              />
            </CommandList>
          </motion.div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country
  onChange: (country: RPNInput.Country) => void
}

const CountrySelectOption = ({
  country,
  countryName,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <>
      <CommandItem
        className="gap-2"
        onSelect={() => {
          onChange(country)
        }}
      >
        <FlagComponent country={country} countryName={countryName} />
        <span className="flex-1 text-sm text-custom-surface-on-surface-variant">
          {countryName}
        </span>
        <span className="text-sm text-custom-surface-on-surface-variant">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      </CommandItem>
    </>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}

export { PhoneInput }
