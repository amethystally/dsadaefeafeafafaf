import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  // Return a simple response for testing
  return new NextResponse(`Test response for ${email}`, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, max-age=0",
    },
  })
}

