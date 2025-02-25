'use client'

import { motion } from 'framer-motion'
import React from 'react'

const languages = [
  { id: 'en', label: 'EN' },
  { id: 'ge', label: 'GE' },
  { id: 'ru', label: 'RU' },
]

export function LanguageSelector() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed bottom-8 space-x-4"
    >
      {languages.map((lang, index) => (
        <React.Fragment key={lang.id}>
          <button
            className="font-justice cursor-pointer text-sm opacity-60 transition-opacity hover:opacity-100"
            onClick={() => {
              /* handle language change */
            }}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="font-justice text-sm opacity-60">✶</span>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  )
}
