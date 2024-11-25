import Dumbbell from '@/components/icons/Dumbbell'
import { ChevronRight, Clock, Globe01, User03 } from '@untitled-ui/icons-react'

export const STAGES_SLIDES: {
  text: 'Country' | 'Club' | 'Owner' | 'Approval' | 'Next'
  icon: React.FC
}[] = [
  {
    text: 'Country',
    icon: Globe01,
  },
  {
    text: 'Next',
    icon: ChevronRight,
  },
  {
    text: 'Club',
    icon: Dumbbell,
  },
  {
    text: 'Next',
    icon: ChevronRight,
  },
  {
    text: 'Owner',
    icon: User03,
  },
  {
    text: 'Next',
    icon: ChevronRight,
  },
  {
    text: 'Approval',
    icon: Clock,
  },
]
