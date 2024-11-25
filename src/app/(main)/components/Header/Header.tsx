'use client'

import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'

const Header = () => {
  return (
    <div className="relative flex items-center justify-center bg-gradient-to-tl from-[#3b6c8d] to-[#001c57] py-6 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.4 } }}
        className="inline-block w-2/3 px-4 text-center py-4"
      >
        <h1 className="text-xl font-[700]">Setup Your Account</h1>
        <p className="mt-1.5 text-base">
          Get ready to simplify your business operations
        </p>
      </motion.div>
    </div>
  )
}

export default Header
