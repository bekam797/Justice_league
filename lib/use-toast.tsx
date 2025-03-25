'use client'

import { useState } from 'react'

interface Toast {
  title: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = 'default' }: Toast) => {
    // In a real implementation, this would display a toast notification
    // For now, we'll just log to console
    console.log(`Toast (${variant}):`, title, description)

    // Add toast to state
    const newToast = { title, description, variant }
    setToasts((prev) => [...prev, newToast])

    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== newToast))
    }, 5000)
  }

  return { toast, toasts }
}
