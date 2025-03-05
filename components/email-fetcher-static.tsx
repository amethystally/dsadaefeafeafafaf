"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Country code to name mapping
const countryNames: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  JP: "Japan",
  CN: "China",
  RU: "Russia",
  BR: "Brazil",
  IN: "India",
  MX: "Mexico",
  KR: "South Korea",
  CH: "Switzerland",
  BE: "Belgium",
  // Add more as needed
}

// Mock database of country codes for common email domains
const domainCountryMap: Record<string, string> = {
  // United States
  "gmail.com": "US",
  "yahoo.com": "US",
  "hotmail.com": "US",
  "outlook.com": "US",
  "aol.com": "US",
  "icloud.com": "US",
  "msn.com": "US",
  "live.com": "US",

  // United Kingdom
  "hotmail.co.uk": "GB",
  "gmail.co.uk": "GB",
  "yahoo.co.uk": "GB",
  "outlook.co.uk": "GB",
  "btinternet.com": "GB",
  "sky.com": "GB",
  "virginmedia.com": "GB",

  // Canada
  "yahoo.ca": "CA",
  "gmail.ca": "CA",
  "hotmail.ca": "CA",
  "outlook.ca": "CA",
  "sympatico.ca": "CA",
  "rogers.com": "CA",
  "shaw.ca": "CA",
  "bell.net": "CA",

  // Australia
  "gmail.com.au": "AU",
  "yahoo.com.au": "AU",
  "hotmail.com.au": "AU",
  "outlook.com.au": "AU",
  "bigpond.com": "AU",
  "optusnet.com.au": "AU",
  "iinet.net.au": "AU",
  "tpg.com.au": "AU",

  // Germany
  "gmail.de": "DE",
  "yahoo.de": "DE",
  "hotmail.de": "DE",
  "outlook.de": "DE",
  "gmx.de": "DE",
  "web.de": "DE",
  "t-online.de": "DE",

  // France
  "gmail.fr": "FR",
  "yahoo.fr": "FR",
  "hotmail.fr": "FR",
  "outlook.fr": "FR",
  "orange.fr": "FR",
  "free.fr": "FR",
  "laposte.net": "FR",

  // Add more as needed
}

// TLD country map for fallback
const tldCountryMap: Record<string, string> = {
  uk: "GB", // United Kingdom
  de: "DE", // Germany
  fr: "FR", // France
  it: "IT", // Italy
  es: "ES", // Spain
  jp: "JP", // Japan
  cn: "CN", // China
  ru: "RU", // Russia
  br: "BR", // Brazil
  in: "IN", // India
  mx: "MX", // Mexico
  kr: "KR", // South Korea
  ch: "CH", // Switzerland
  be: "Belgium",
  ca: "CA", // Canada
  au: "AU", // Australia
  // Add more as needed
}

export function EmailFetcherStatic() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      // Client-side processing for static hosting
      const parts = email.split("@")
      if (parts.length !== 2) {
        throw new Error("Invalid email format")
      }

      const domain = parts[1].toLowerCase()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Get the country code from our map
      let countryCode = domainCountryMap[domain]

      if (!countryCode) {
        // For domains not in our map, try to guess based on TLD
        const domainParts = domain.split(".")
        const tld = domainParts[domainParts.length - 1].toLowerCase()

        // Check if the TLD is in our country map
        if (tldCountryMap[tld]) {
          countryCode = tldCountryMap[tld]
        }
        // Check for country-specific second-level domains (like co.uk)
        else if (domainParts.length > 2) {
          const sld = domainParts[domainParts.length - 2].toLowerCase()

          if (sld === "co" || sld === "com" || sld === "ac" || sld === "gov" || sld === "edu") {
            // For domains like example.co.uk, check the TLD (uk)
            if (tldCountryMap[tld]) {
              countryCode = tldCountryMap[tld]
            }
          }
        }

        // If still no match, default to US
        if (!countryCode) {
          countryCode = "US"
        }
      }

      // Format the result
      let formattedResult = countryCode

      // Special handling for "SG" response - always convert to "Account not found" (case-insensitive)
      if (formattedResult.toUpperCase() === "SG") {
        console.log("Static component: Converting SG to 'Account not found'")
        formattedResult = "Account not found"
      }
      // If it's a country code, add some context
      else if (formattedResult.length === 2 && /^[A-Z]{2}$/i.test(formattedResult)) {
        const countryName = countryNames[formattedResult.toUpperCase()] || "Unknown Country"
        formattedResult = `${formattedResult.toUpperCase()} (${countryName})`
      }

      setResult(formattedResult)
    } catch (err) {
      console.error("Processing error:", err)
      setError(err instanceof Error ? err.message : "An error occurred while processing the data.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          TikTok Account Email Region Fetcher
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Enter a TikTok account email to discover its region
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="tiktok@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-12 px-4 rounded-xl border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 transition-all"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl font-medium text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition-all duration-300 relative overflow-hidden shine-effect active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Fetching...
              </>
            ) : (
              "Fetch Region"
            )}
            <span className="absolute top-0 left-0 w-full h-full shine-element"></span>
          </Button>
        </form>

        {error && (
          <Alert
            variant="destructive"
            className="mt-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-xl"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      {result && (
        <CardFooter className="flex flex-col items-start pt-0">
          <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Region:</h3>
          <div className="w-full p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto shadow-sm">
            <p className="font-mono text-lg font-semibold text-pink-600 dark:text-pink-400">{result}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

