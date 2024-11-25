'use client'

import React, { useContext } from 'react'
import { StageContext } from '../../contexts/StageContext'
import CountryFormStage from './CountryFormStage/CountryFormStage'
import ClubFormStage from './ClubFormStage/ClubFormStage'
import OwnerFormStage from './OwnerFormStage/OwnerFormStage'
import ApprovalStage from './ApprovalStage/ApprovalStage'
import { AnimatePresence, motion } from 'motion/react'

const FormStages = () => {
  const { curStage } = useContext(StageContext)

  if (!curStage) {
    return <></>
  }

  const { text } = curStage

  const renderFormStages = () => {
    switch (text) {
      case 'Country':
        return <CountryFormStage key={text} />
      case 'Club':
        return <ClubFormStage key={text} />
      case 'Owner':
        return <OwnerFormStage key={text} />
      case 'Approval':
        return <ApprovalStage key={text} />
      default:
        return <></>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.4 } }}
    >
      <AnimatePresence mode="wait">{renderFormStages()}</AnimatePresence>
    </motion.div>
  )
}

export default FormStages
