'use client'

import React, { createContext, ReactNode, useState, useEffect } from 'react'
import { STAGES_SLIDES } from '../constants/STAGES_SLIDES'

type Stage = (typeof STAGES_SLIDES)[number]
interface StageContextType {
  stages: Stage[]
  setActiveStageByText: (stageText: Exclude<Stage['text'], 'Next'>) => void
  activeStageIndex: number
  curStage?: Stage
}

const defaultContextValue: StageContextType = {
  stages: [],
  setActiveStageByText: () => {},
  activeStageIndex: -1,
  curStage: undefined,
}

export const StageContext = createContext<StageContextType>(defaultContextValue)

interface StageContextProviderProps {
  children: ReactNode
}

export const StageContextProvider: React.FC<StageContextProviderProps> = ({
  children,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(-1)
  const stages = STAGES_SLIDES
  const stagesText = STAGES_SLIDES.map((st) => st.text)

  const setActiveStageByText = (stageText: Exclude<Stage['text'], 'Next'>) => {
    const targetIndex = stages.findIndex((stage) => stage.text === stageText)
    if (targetIndex !== -1) {
      setActiveStageIndex(targetIndex)
    }
  }

  useEffect(() => {
    if (activeStageIndex !== -1) {
      localStorage.setItem('activeStageIndex', activeStageIndex.toString())
    }
  }, [activeStageIndex])

  useEffect(() => {
    try {
      const localStorageActiveStageIndex = parseInt(
        localStorage.getItem('activeStageIndex') as string
      )

      if (
        isNaN(localStorageActiveStageIndex) ||
        localStorageActiveStageIndex < 0 ||
        stagesText[localStorageActiveStageIndex] === 'Next'
      ) {
        throw new Error('invalid index')
      }

      setActiveStageByText(stagesText[localStorageActiveStageIndex])
    } catch {
      setActiveStageByText('Country')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StageContext.Provider
      value={{
        stages,
        setActiveStageByText,
        activeStageIndex,
        curStage: stages[activeStageIndex],
      }}
    >
      {children}
    </StageContext.Provider>
  )
}
