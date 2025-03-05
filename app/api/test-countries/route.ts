import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Test domains to check
const testDomains = [
  "test@gmail.com",
  "test@yahoo.co.uk",
  "test@mail.ru",
  "test@protonmail.com",
  "test@web.de",
  "test@orange.fr",
  "test@libero.it",
  "test@qq.com",
  "test@yahoo.co.jp",
  "test@uol.com.br",
]

export async function GET(request: NextRequest) {
  const results = []
  const host = request.headers.get("host") || "localhost:3000"
  const protocol = host.includes("localhost") ? "http" : "https"
  const baseUrl = `${protocol}://${host}`

  for (const email of testDomains) {
    const domain = email.split("@")[1]

    // Call our mock-email-data endpoint using relative URL
    try {
      const response = await fetch(`${baseUrl}/api/fetch-email-data?email=${encodeURIComponent(email)}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.text()
        results.push({
          email,
          domain,
          result: data,
        })
      } else {
        results.push({
          email,
          domain,
          error: `${response.status} ${response.statusText}`,
        })
      }
    } catch (error) {
      results.push({
        email,
        domain,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  return NextResponse.json(results)
}

