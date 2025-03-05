"use client"

import { useState, useEffect } from "react"
import { EmailFetcher } from "@/components/email-fetcher"
import { UsernameFetcher } from "@/components/username-fetcher"
import { EmailFetcherStatic } from "@/components/email-fetcher-static"
import { ThemeToggle } from "./theme-toggle"

export default function Home() {
  // Determine if we're using the static version (no API routes)
  const [isStatic, setIsStatic] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if we're in static export mode based on environment variable
    // or check if API routes are available by making a test request
    const checkApiAvailability = async () => {
      // First check if we're explicitly in static mode via env var
      if (typeof window !== "undefined" && window.ENV_IS_STATIC === "true") {
        console.log("Static mode detected via environment variable")
        setIsStatic(true)
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/direct?email=test@example.com", {
          method: "GET",
          // Add cache busting to prevent cached responses
          headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        })

        // If we get any response (even an error), the API route exists
        setIsStatic(false)
      } catch (error) {
        // If fetch fails completely, we're likely on a static host
        console.log("API routes not available, using static mode")
        setIsStatic(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkApiAvailability()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ThemeToggle />
      <div className="w-full max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isStatic ? (
              <>
                <div className="w-full">
                  <EmailFetcherStatic />
                </div>
              </>
            ) : (
              <>
                <div className="w-full">
                  <UsernameFetcher />
                </div>
                <div className="w-full">
                  <EmailFetcher />
                </div>
              </>
            )}
          </div>
        )}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          This tool helps identify the region of TikTok accounts based on their username or email address.
          {isStatic && " (Running in static mode)"}
        </p>
      </div>
    </main>
  )
}

