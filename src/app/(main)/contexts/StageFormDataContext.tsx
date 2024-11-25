'use client'

import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  FC,
} from 'react'
import { CountryFormInputsType } from '../components/FormStages/CountryFormStage/CountryFormStage'
import { ClubFormInputsType } from '../components/FormStages/ClubFormStage/ClubFormStage'
import { OwnerFormInputsType } from '../components/FormStages/OwnerFormStage/OwnerFormStage'

type StageFormDataType = {
  Country: CountryFormInputsType | null
  Club: ClubFormInputsType | null
  Owner: OwnerFormInputsType | null
}

type StageFormDataContextType = {
  stageFormData: StageFormDataType
  setStageFormData: React.Dispatch<React.SetStateAction<StageFormDataType>>
  handleSetStageFormData: <T extends keyof StageFormDataType>(
    key: T,
    data: StageFormDataType[T]
  ) => void
  resetEntireFormData: () => void
}

const getDefaultStageFormData = (): StageFormDataType => {
  try {
    const localStorageData = localStorage.getItem('stageFormData')
    const parsedData = localStorageData
      ? JSON.parse(localStorageData)
      : defaultStageFormData

    if (parsedData.Club && parsedData.Club.open_date) {
      parsedData.Club.open_date = new Date(parsedData.Club.open_date)
    }

    return parsedData
  } catch {
    return defaultStageFormData
  }
}

const defaultStageFormData: StageFormDataType = {
  Country: {
    country: '',
  },
  Club: {
    clubname: '',
    timezone: '',
    address: '',
    city: '',
    zipcode: '',
    open_status: 'yes',
  },
  Owner: {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  },
}

const defaultContextValue: StageFormDataContextType = {
  stageFormData: defaultStageFormData,
  setStageFormData: () => {},
  handleSetStageFormData: () => {},
  resetEntireFormData: () => {},
}

export const StageFormDataContext =
  createContext<StageFormDataContextType>(defaultContextValue)

interface StageFormDataContextProviderProps {
  children: ReactNode
}

export const StageFormDataContextProvider: FC<
  StageFormDataContextProviderProps
> = ({ children }) => {
  const [stageFormData, setStageFormData] = useState<StageFormDataType>(
    getDefaultStageFormData
  )

  useEffect(() => {
    localStorage.setItem('stageFormData', JSON.stringify(stageFormData))
  }, [stageFormData])

  const handleSetStageFormData = useCallback(
    (
      key: keyof StageFormDataType,
      data: StageFormDataType[keyof StageFormDataType]
    ) => {
      setStageFormData((prevState) => ({ ...prevState, [key]: data }))
    },
    []
  )

  const resetEntireFormData = () => {
    setStageFormData({ ...defaultStageFormData })
  }

  return (
    <StageFormDataContext.Provider
      value={{
        stageFormData,
        setStageFormData,
        handleSetStageFormData,
        resetEntireFormData,
      }}
    >
      {children}
    </StageFormDataContext.Provider>
  )
}
