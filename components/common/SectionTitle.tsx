'use client'

import { motion } from 'framer-motion'
import { useTextTransform } from 'lib/use-text-transform'

interface SectionTitleProps {
  title?: string
}

export default function SectionTitle({ title = 'Default Title' }: SectionTitleProps) {
  const textStyle = useTextTransform()

  return (
    <div className="w-full overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-justice w-full max-w-[81.7vw] text-[48px] leading-[1.2] font-normal text-white uppercase sm:text-[3.75vw] sm:leading-[1.2] md:text-[4.5vw] lg:text-[5.25vw] xl:text-[6vw] 2xl:text-[6.25vw]"
        >
          <span
            className="bg-[#061A31] box-decoration-clone px-[1.25vw] py-[0.5vw] pl-0"
            style={textStyle}
          >
            {title}
          </span>
        </motion.h1>
      </motion.div>
    </div>
  )
}
