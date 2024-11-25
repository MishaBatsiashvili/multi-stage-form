'use client'

import { COUNTRIES } from '@/app/(main)/constants/COUNTRIES'
import { StageContext } from '@/app/(main)/contexts/StageContext'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronRight } from '@untitled-ui/icons-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { StageFormDataContext } from '@/app/(main)/contexts/StageFormDataContext'

const schema = z.object({
  country: z.string().min(1),
})

export type CountryFormInputsType = z.infer<typeof schema>

const CountryFormStage = () => {
  const { setActiveStageByText } = useContext(StageContext)
  const { stageFormData, handleSetStageFormData } =
    useContext(StageFormDataContext)

  const methods = useForm<CountryFormInputsType>({
    resolver: zodResolver(schema),
    defaultValues: stageFormData['Country']!,
  })

  const onSubmitHandler = (data: CountryFormInputsType) => {
    setActiveStageByText('Club')
    handleSetStageFormData('Country', data)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="mx-auto w-[343px] pt-8 text-center sm:w-[375px]"
    >
      <h2 className="text-xl font-bold">Select Country</h2>
      <p className="mt-1.5 text-base text-custom-surface-on-surface-variant">
        Select country to customize your experience and access location-specific
        features
      </p>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <div className="mt-8">
            <FormField
              control={methods.control}
              name="country"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {COUNTRIES.map((c) => (
                            <SelectItem key={c.country} value={`${c.value}`}>
                              <div className="flex items-center">
                                <Image
                                  src={c.flag}
                                  alt={c.country}
                                  width={20}
                                  height={20}
                                  className="mr-2 block"
                                />
                                <span>{c.country}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            className="mt-8 w-full"
            size="lg"
            variant={'default'}
            type="submit"
          >
            Next
            <ChevronRight />
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}

export default CountryFormStage
