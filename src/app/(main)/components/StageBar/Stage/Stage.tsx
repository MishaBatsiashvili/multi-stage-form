import { CheckCircle } from 'lucide-react'
import React from 'react'

type StageProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  children: React.ReactNode
  width: number
  height: number
  isActive?: boolean
  isDone?: boolean
}
const Stage: React.FC<StageProps> = ({
  icon: Icon,
  children,
  width,
  height,
  isActive = false,
  isDone = false,
}) => {
  const getTextColorClass = () => {
    if (isDone) return 'text-custom-primary-primary'
    return isActive
      ? 'text-custom-primary-on-primary-container'
      : 'text-custom-surface-on-surface-variant'
  }

  const getBgColorClass = () => {
    return isActive ? 'bg-custom-primary-primary-container' : 'border'
  }

  const renderIcon = () =>
    isDone ? (
      <CheckCircle width={width} height={height} />
    ) : (
      <Icon width={width} height={height} />
    )

  return (
    <div
      className={`border-custom-stage-gray flex h-[36px] w-[165px] items-center justify-center rounded-lg ${getBgColorClass()} transition-all`}
    >
      <div
        className={`mr-1.5 ${getTextColorClass()}`}
        style={{ width, height }}
      >
        {renderIcon()}
      </div>
      <span
        className={`text-sm font-semibold ${getTextColorClass()} transition-all`}
      >
        {children}
      </span>
    </div>
  )
}
export default Stage
