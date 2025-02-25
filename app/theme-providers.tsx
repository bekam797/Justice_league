'use client'

import { ThemeProvider } from 'next-themes'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      {children}
    </ThemeProvider>
  )
}
