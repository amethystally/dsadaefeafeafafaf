import { type NextRequest, NextResponse } from "next/server"

// This is a debug endpoint to help troubleshoot API issues
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const input = searchParams.get("input") || "test"

  // If the input is "SG" or "sg", return "Account not found" to test the conversion
  if (input.toUpperCase() === "SG") {
    return new NextResponse("Account not found", {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-store",
      },
    })
  }

  return NextResponse.json(
    {
      timestamp: new Date().toISOString(),
      input,
      environment: {
        node_env: process.env.NODE_ENV,
        vercel_env: process.env.VERCEL_ENV,
        static_export: process.env.STATIC_EXPORT,
      },
      headers: Object.fromEntries(request.headers.entries()),
      message: "This endpoint is for debugging purposes only",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  )
}

