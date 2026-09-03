import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'thePORTAL · Athlete recruiting network',
  description: 'Discover verified athlete profiles, performance data, and potential with thePORTAL.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className="app-background"><body>{children}</body></html>
}
