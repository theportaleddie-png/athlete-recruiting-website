import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "thePORTAL — Where Athletes Get Recruited",
  description:
    "thePORTAL connects high school athletes with college coaches. Build your player card, get discovered, and power on through Education, Performance, Mentorship, and Networking.",
  keywords: [
    "athlete recruiting",
    "college recruiting",
    "student athlete",
    "player card",
    "college coaches",
    "recruiting platform",
  ],
  openGraph: {
    title: "thePORTAL — Where Athletes Get Recruited",
    description:
      "Build your player card, get discovered by college coaches, and take control of your recruiting journey.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
