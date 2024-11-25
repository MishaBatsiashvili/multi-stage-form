'use client'

import { StageContext } from '@/app/(main)/contexts/StageContext'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { ChevronLeft } from '@untitled-ui/icons-react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'motion/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { StageFormDataContext } from '@/app/(main)/contexts/StageFormDataContext'
import * as RPNInput from 'react-phone-number-input'

const schema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().min(1).email(),
  phone: z
    .string()
    .min(1)
    .refine(
      (phone) => {
        return RPNInput.isValidPhoneNumber(phone)
      },
      {
        message: 'Invalid phone',
      }
    ),
})

export type OwnerFormInputsType = z.infer<typeof schema>

const OwnerFormStage = () => {
  const { setActiveStageByText } = useContext(StageContext)
  const { stageFormData, handleSetStageFormData } =
    useContext(StageFormDataContext)

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: stageFormData['Owner']!,
  })

  const onSubmitHandler = (data: OwnerFormInputsType) => {
    setActiveStageByText('Approval')
    handleSetStageFormData('Owner', data)

    // and then sending api request from here
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="mx-auto w-[343px] pt-8 text-center sm:w-[512px]"
    >
      <h2 className="text-xl font-bold">Provide Owner Information</h2>
      <p className="mt-1.5 text-base text-custom-surface-on-surface-variant">
        This will be the administration of your account.
      </p>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <div className="mt-8">
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FormField
                control={methods.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} className="w-full" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8 grid w-full grid-cols-2">
            <Button
              type="button"
              size="lg"
              className="col-span-1 mr-4"
              variant="secondary"
              onClick={() => setActiveStageByText('Club')}
            >
              <ChevronLeft />
              Previous
            </Button>
            <Button type="submit" size="lg" className="col-span-1">
              Set Up Account
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}

export default OwnerFormStage
