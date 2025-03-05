import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TikTok Account Email Region Fetcher",
  description: "Discover the region of TikTok accounts based on their email address",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Include environment variables script for static builds */}
        {process.env.STATIC_EXPORT === "true" && <script src="/env.js" />}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import "./globals.css"

