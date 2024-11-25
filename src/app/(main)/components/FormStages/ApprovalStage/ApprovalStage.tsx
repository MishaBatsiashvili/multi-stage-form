import { Clock } from '@untitled-ui/icons-react'
import React, { useContext } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { StageContext } from '@/app/(main)/contexts/StageContext'
import { StageFormDataContext } from '@/app/(main)/contexts/StageFormDataContext'

const ApprovalStage = () => {

  const { setActiveStageByText } = useContext(StageContext)
  const { resetEntireFormData } = useContext(StageFormDataContext)

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="mx-auto w-[343px] pt-8 text-center sm:w-[375px]"
    >
      <div className="inline-block rounded-full border-8 border-custom-warning/50">
        <div className="relative h-10 w-10 rounded-full bg-custom-warning">
          <Clock className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-custom-featured-icon-light-fg-warning" />
        </div>
      </div>
      <h2 className="mt-4 text-xl font-bold">Awaiting Approval</h2>
      <p className="mt-1.5 text-base text-custom-surface-on-surface-variant">
        Your account will be setup once approved, you will receive an email as
        soon it&apos;s ready, approvals usually happen in a few hours
      </p>

      <Button className='mt-6' onClick={() => {
        localStorage.removeItem('stageFormData')
        localStorage.removeItem('activeStageIndex')
        resetEntireFormData()
        setActiveStageByText('Country')
      }}>Reset Form Demo</Button>
    </motion.div>
  )
}

export default ApprovalStage
