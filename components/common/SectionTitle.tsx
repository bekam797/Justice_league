'use client'

import { motion } from 'framer-motion'

export default function SectionTitle() {
  return (
    <div className="w-full overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-justice w-full max-w-[81.7vw] text-[3.75vw] leading-[1.2] font-normal text-white uppercase sm:text-[4.5vw] md:text-[5.25vw] lg:text-[6vw] xl:text-[6.25vw]"
        >
          <span className="bg-[#3d3801] box-decoration-clone px-[1.25vw] py-[0.5vw] pl-0">
            Dedicated to protecting your rights and achieving your legal goals
          </span>
        </motion.h1>
      </motion.div>
    </div>
  )
}
