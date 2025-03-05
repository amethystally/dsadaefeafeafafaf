import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getTestResults() {
  // This is a server component, so we can fetch directly
  // Use a safe way to get the base URL without relying on VERCEL_URL
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000"

  try {
    const response = await fetch(`${baseUrl}/api/test-countries`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch test results: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching test results:", error)
    return [{ error: "Failed to fetch test results. Please try again later." }]
  }
}

export default async function TestPage() {
  const results = await getTestResults()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Country Detection Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((result: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-sm truncate">{result.email || "Test Email"}</CardTitle>
            </CardHeader>
            <CardContent>
              {result.error ? (
                <p className="text-red-500">{result.error}</p>
              ) : (
                <div>
                  <p>
                    <span className="font-semibold">Domain:</span> {result.domain || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Country:</span> {result.countryCode || result.result || "N/A"} -{" "}
                    {result.countryName || "Unknown"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

