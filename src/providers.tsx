'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/toaster'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      {children}
      <Toaster />
    </ThemeProvider>
  )
} 