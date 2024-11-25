'use client'

import React, { useContext, useEffect, useRef } from 'react'
import Stage from './Stage/Stage'
import NextStep from '@/components/icons/NextStep'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass from 'swiper'
import { StageContext } from '../../contexts/StageContext'
import { motion } from 'motion/react'

const StageBar = () => {
  const swiperRef = useRef<SwiperClass>()
  const { stages, activeStageIndex } = useContext(StageContext)

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeStageIndex)
    }
  }, [activeStageIndex])

  const renderSlides = () => {
    let slideCounter = 0
    return stages.map((stage, i) => {
      if (stage.text === 'Next') {
        return (
          <SwiperSlide key={stage.text + i} className="my-auto w-[36px]">
            <NextStep />
          </SwiperSlide>
        )
      } else {
        slideCounter++ // Increment the slide counter only for regular stages

        return (
          <SwiperSlide
            key={stage.text + i}
            className={`flex w-[165px] items-center`}
          >
            <Stage
              width={20}
              height={20}
              icon={stage.icon}
              isActive={activeStageIndex === i}
              isDone={i < activeStageIndex}
            >
              {slideCounter}. {stage.text}
            </Stage>
          </SwiperSlide>
        )
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4 } }}
      className="flex h-[84px] items-center overflow-hidden border-b border-custom-outline-outline-variant bg-custom-surface-surface-container-highest sm:justify-center"
    >
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={0}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        allowTouchMove={false}
        centeredSlidesBounds={true}
        centeredSlides={true}
        className="w-[770px] items-center px-3.5 md:px-0"
      >
        {renderSlides()}
      </Swiper>
    </motion.div>
  )
}

export default StageBar
