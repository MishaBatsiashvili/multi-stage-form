'use client'

import { StageContext } from '@/app/(main)/contexts/StageContext'
import { Button } from '@/components/ui/button'
import { Datepicker } from '@/components/ui/datepicker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from '@untitled-ui/icons-react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'motion/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { StageFormDataContext } from '@/app/(main)/contexts/StageFormDataContext'
import { POST_CODE_REGEX_MAP } from '@/app/(main)/constants/POST_CODE_REGEX_MAP'

const useGenerateSchema = () => {
  const { stageFormData } = useContext(StageFormDataContext)
  return z.any().superRefine((data, ctx) => {
    const schema = z.object({
      clubname: z.string().min(1, 'Club Name is required'),
      timezone: z.string().min(1, 'Timezone is required'),
      address: z.string().min(1, 'Address is required'),
      city: z.string().min(1, 'City is required'),
      zipcode: z
        .string()
        .min(1, 'Postcode / Zip Code is required')
        .regex(
          POST_CODE_REGEX_MAP[
            stageFormData['Country']![
              'country'
            ] as keyof typeof POST_CODE_REGEX_MAP
          ],
          'Invalid Postcode / Zip Code format'
        ),
      open_status: z.enum(['yes', 'no']),
      open_date: z.date().optional(),
    })

    const validationResult = schema.safeParse(data)
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        ctx.addIssue(issue)
      })
    }

    if (data.open_status === 'no' && !data.open_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Open Date is required when the club is open',
        path: ['open_date'],
      })
    }
  })
}

export type ClubFormInputsType = z.infer<ReturnType<typeof useGenerateSchema>>

const ClubFormStage = () => {
  const { setActiveStageByText } = useContext(StageContext)
  const { stageFormData, handleSetStageFormData } =
    useContext(StageFormDataContext)

  const schema = useGenerateSchema()

  const methods = useForm<ClubFormInputsType>({
    resolver: zodResolver(schema),
    defaultValues: stageFormData['Club']!,
  })

  const onSubmitHandler = (data: ClubFormInputsType) => {
    setActiveStageByText('Owner')
    handleSetStageFormData('Club', data)
  }

  const showDatepicker = methods.watch('open_status') === 'no'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="mx-auto w-[343px] pt-8 text-center sm:w-[512px]"
    >
      <h2 className="text-xl font-bold">Provide Club Information</h2>
      <p className="mt-1.5 text-base text-custom-surface-on-surface-variant">
        You will be able to update these settings later if required.
      </p>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <FormField
              control={methods.control}
              name="clubname"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Club Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Club Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="timezone"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Timezone</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="col-span-1">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="gmt+4">GMT +4</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={methods.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FormField
              control={methods.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Postcode / Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Postcode / Zip Code" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={methods.control}
            name="open_status"
            render={({ field }) => (
              <FormItem className="col-span-1 mt-6">
                <FormLabel className="mb-4">Is your club open?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="r1" />
                      <Label htmlFor="r1">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="r2" />
                      <Label htmlFor="r2">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {showDatepicker && (
            <FormField
              control={methods.control}
              name="open_date"
              render={({ field }) => (
                <FormItem className="col-span-1 mt-6">
                  <FormLabel className="mb-4 text-custom-surface-on-surface-variant leading-5">
                    Choose the opening date for your club. You can update this
                    later if needed!
                  </FormLabel>
                  <FormControl>
                    <Datepicker
                      field={field}
                      placeholder="Select a date"
                      disabled={(date) => date < new Date()}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <div className="mt-8 grid w-full grid-cols-2">
            <Button
              size="lg"
              className="col-span-1 mr-4"
              variant="secondary"
              type="button"
              onClick={() => setActiveStageByText('Country')}
            >
              <ChevronLeft />
              Previous
            </Button>
            <Button size="lg" className="col-span-1" type="submit">
              Next
              <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}

export default ClubFormStage
