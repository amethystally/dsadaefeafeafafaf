import { type NextRequest, NextResponse } from "next/server"

// This endpoint can return either "SG" or "sg" to test the case-insensitive conversion
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const format = searchParams.get("format") || "upper"

  // Return either uppercase or lowercase SG based on the format parameter
  const result = format === "lower" ? "sg" : "SG"

  return new NextResponse(result, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store",
    },
  })
}

