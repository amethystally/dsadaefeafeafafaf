import { type NextRequest, NextResponse } from "next/server"

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

  // Italy
  "gmail.it": "IT",
  "yahoo.it": "IT",
  "hotmail.it": "IT",
  "outlook.it": "IT",
  "libero.it": "IT",
  "tiscali.it": "IT",
  "virgilio.it": "IT",

  // Spain
  "gmail.es": "ES",
  "yahoo.es": "ES",
  "hotmail.es": "ES",
  "outlook.es": "ES",

  // Japan
  "gmail.jp": "JP",
  "yahoo.co.jp": "JP",
  "hotmail.jp": "JP",
  "outlook.jp": "JP",
  "ezweb.ne.jp": "JP",
  "docomo.ne.jp": "JP",

  // China
  "qq.com": "CN",
  "163.com": "CN",
  "126.com": "CN",
  "sina.com": "CN",
  "gmail.cn": "CN",
  "yahoo.cn": "CN",

  // Russia
  "mail.ru": "RU",
  "yandex.ru": "RU",
  "gmail.ru": "RU",
  "yahoo.ru": "RU",

  // Brazil
  "gmail.com.br": "BR",
  "yahoo.com.br": "BR",
  "hotmail.com.br": "BR",
  "outlook.com.br": "BR",
  "uol.com.br": "BR",
  "bol.com.br": "BR",
  "globo.com": "BR",
  "terra.com.br": "BR",

  // India
  "gmail.co.in": "IN",
  "yahoo.co.in": "IN",
  "hotmail.co.in": "IN",
  "outlook.co.in": "IN",
  "rediffmail.com": "IN",

  // Mexico
  "gmail.com.mx": "MX",
  "yahoo.com.mx": "MX",
  "hotmail.com.mx": "MX",
  "outlook.com.mx": "MX",

  // South Korea
  "naver.com": "KR",
  "daum.net": "KR",
  "gmail.co.kr": "KR",
  "yahoo.co.kr": "KR",

  // Switzerland
  "gmail.ch": "CH",
  "yahoo.ch": "CH",
  "hotmail.ch": "CH",
  "outlook.ch": "CH",
  "protonmail.com": "CH",
  "protonmail.ch": "CH",

  // Belgium
  "gmail.be": "BE",
  "yahoo.be": "BE",
  "hotmail.be": "BE",
  "outlook.be": "BE",
  "telenet.be": "BE",
  "skynet.be": "BE",
}

// Country TLD map for fallback
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
  be: "BE", // Belgium
  ca: "CA", // Canada
  au: "AU", // Australia
  nz: "NZ", // New Zealand
  nl: "NL", // Netherlands
  se: "SE", // Sweden
  no: "NO", // Norway
  dk: "DK", // Denmark
  fi: "FI", // Finland
  pl: "PL", // Poland
  cz: "CZ", // Czech Republic
  at: "AT", // Austria
  hu: "HU", // Hungary
  gr: "GR", // Greece
  pt: "PT", // Portugal
  ie: "IE", // Ireland
  il: "IL", // Israel
  sg: "SG", // Singapore
  hk: "HK", // Hong Kong
  tr: "TR", // Turkey
  za: "ZA", // South Africa
  // Add more as needed
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get("email")
  const debug = searchParams.get("debug") === "true"

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  try {
    // Extract the domain from the email
    const parts = email.split("@")
    if (parts.length !== 2) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const domain = parts[1].toLowerCase()
    console.log(`Processing email with domain: ${domain}`)

    // Debug information
    const debugInfo = {
      email: email,
      domain: domain,
      lookupMethod: "",
      result: "",
    }

    // Get the country code from our map
    let countryCode = domainCountryMap[domain]

    if (countryCode) {
      debugInfo.lookupMethod = "Direct domain match"
      debugInfo.result = countryCode
      console.log(`Found direct match for domain ${domain}: ${countryCode}`)
    } else {
      // For domains not in our map, try to guess based on TLD
      const domainParts = domain.split(".")
      const tld = domainParts[domainParts.length - 1].toLowerCase()

      // Check if the TLD is in our country map
      if (tldCountryMap[tld]) {
        countryCode = tldCountryMap[tld]
        debugInfo.lookupMethod = "TLD match"
        debugInfo.result = countryCode
        console.log(`Found TLD match for ${tld}: ${countryCode}`)
      }
      // Check for country-specific second-level domains (like co.uk)
      else if (domainParts.length > 2) {
        const sld = domainParts[domainParts.length - 2].toLowerCase()
        const combinedTld = `${sld}.${tld}`

        if (sld === "co" || sld === "com" || sld === "ac" || sld === "gov" || sld === "edu") {
          // For domains like example.co.uk, check the TLD (uk)
          if (tldCountryMap[tld]) {
            countryCode = tldCountryMap[tld]
            debugInfo.lookupMethod = "Country-specific SLD match"
            debugInfo.result = countryCode
            console.log(`Found country-specific SLD match for ${combinedTld}: ${countryCode}`)
          }
        }
      }

      // If still no match, use a random country or default to US
      if (!countryCode) {
        // For testing variety, assign different countries based on the first letter of the domain
        const firstChar = domain.charAt(0).toLowerCase()
        const charCode = firstChar.charCodeAt(0) - 97 // 'a' is 97 in ASCII

        // Get all country codes from our maps
        const allCountryCodes = [...new Set([...Object.values(domainCountryMap), ...Object.values(tldCountryMap)])]

        // Use the character code to select a country
        const index = charCode % allCountryCodes.length
        countryCode = allCountryCodes[index] || "US"

        debugInfo.lookupMethod = "Fallback based on first letter"
        debugInfo.result = countryCode
        console.log(`No match found, using fallback for ${domain}: ${countryCode}`)
      }
    }

    // Add a small delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // If debug mode is enabled, return the debug info
    if (debug) {
      return NextResponse.json(debugInfo, {
        headers: {
          "Cache-Control": "no-store",
        },
      })
    }

    return new NextResponse(countryCode, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Error processing email:", error)
    return NextResponse.json({ error: "Failed to process email data" }, { status: 500 })
  }
}

