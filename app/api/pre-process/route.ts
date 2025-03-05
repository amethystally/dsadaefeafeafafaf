import { type NextRequest, NextResponse } from "next/server"

// This is a helper API route that can pre-process responses
// to ensure consistent handling of special cases like "SG"
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const countryCode = searchParams.get("code")

  if (!countryCode) {
    return NextResponse.json({ error: "Country code is required" }, { status: 400 })
  }

  // Special handling for "SG" response
  if (countryCode === "SG") {
    return new NextResponse("Account not found", {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-store",
      },
    })
  }

  // Return the original country code
  return new NextResponse(countryCode, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store",
    },
  })
}

