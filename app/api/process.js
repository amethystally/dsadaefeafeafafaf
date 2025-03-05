// Add a function to handle username processing
export async function onRequest(context) {
  // Get the email or username from the query parameters
  const url = new URL(context.request.url)
  const email = url.searchParams.get("email")
  // Update the username handling to strip @ if present
  const isUsername = !email.includes("@") || email.startsWith("@")
  const processedInput = isUsername && email.startsWith("@") ? email.substring(1) : email

  if (!email) {
    return new Response(JSON.stringify({ error: "Email or username is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }

  try {
    // Construct the URL with the email or username
    // If it's a username (no @ symbol), we'll try to process it directly
    // Use the processed input for the API call
    const targetUrl = isUsername
      ? `https://flask-hello-world-pi-indol.vercel.app/raw/${encodeURIComponent(processedInput)}`
      : `https://flask-hello-world-pi-indol.vercel.app/raw/${encodeURIComponent(processedInput)}`

    console.log(`Fetching data from: ${targetUrl}`)

    // Fetch the data with a timeout
    const controller = new AbortController()
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 15000))

    const fetchPromise = fetch(targetUrl, {
      headers: {
        Accept: "application/json, text/plain",
        "User-Agent": "Cloudflare-Worker",
      },
      cf: {
        // Disable caching
        cacheEverything: false,
        cacheTtl: 0,
      },
    })

    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise])

    if (!response.ok) {
      console.error(`External API error: ${response.status} ${response.statusText}`)
      return new Response(
        JSON.stringify({
          error: `Error from external API: ${response.status} ${response.statusText}`,
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store",
          },
        },
      )
    }

    // Get the content type
    const contentType = response.headers.get("content-type") || ""

    // Handle different response types
    if (contentType.includes("application/json")) {
      // If it's JSON, parse it and extract the country code
      const jsonData = await response.json()
      console.log("Received JSON response:", JSON.stringify(jsonData).substring(0, 200))

      // Check if it has the expected structure with country_code
      if (jsonData?.data?.country_code) {
        return new Response(jsonData.data.country_code, {
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
          },
        })
      } else {
        // Try to extract country_code from the JSON string
        const jsonString = JSON.stringify(jsonData)
        const countryCodeMatch = jsonString.match(/country_code["']?\s*:\s*["']?([A-Z]{2})["']?/i)

        if (countryCodeMatch && countryCodeMatch[1]) {
          return new Response(countryCodeMatch[1], {
            headers: {
              "Content-Type": "text/plain",
              "Cache-Control": "no-store",
              "Access-Control-Allow-Origin": "*",
            },
          })
        }

        // Return an error if we can't find the country code
        return new Response(JSON.stringify({ error: "Could not extract country code from response" }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
          },
        })
      }
    } else {
      // If it's not JSON, get the text
      const data = await response.text()
      console.log(`Received text response (first 200 chars): ${data.substring(0, 200)}`)

      // Try to extract country_code from the text
      const countryCodeMatch = data.match(/country_code["']?\s*:\s*["']?([A-Z]{2})["']?/i)

      if (countryCodeMatch && countryCodeMatch[1]) {
        return new Response(countryCodeMatch[1], {
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
          },
        })
      }

      // Check if it's HTML
      if (data.trim().startsWith("<!DOCTYPE html>") || data.trim().startsWith("<html")) {
        console.log("Received HTML response, attempting to extract country code")

        // Try to extract the country code from the HTML
        const htmlCountryCodeMatch = data.match(/country_code["']?\s*:\s*["']?([A-Z]{2})["']?/i)

        if (htmlCountryCodeMatch && htmlCountryCodeMatch[1]) {
          return new Response(htmlCountryCodeMatch[1], {
            headers: {
              "Content-Type": "text/plain",
              "Cache-Control": "no-store",
              "Access-Control-Allow-Origin": "*",
            },
          })
        }

        // If we can't extract a country code, return an error
        return new Response(JSON.stringify({ error: "Could not extract country code from HTML response" }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
          },
        })
      }

      // If it's plain text and looks like a country code, return it directly
      if (data.trim() === "SG") {
        console.log("Cloudflare Worker converting SG to 'Account not found'")
        return new Response("Account not found", {
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
          },
        })
      }

      // For other country codes
      if (data.trim().length === 2 && /^[A-Z]{2}$/.test(data.trim())) {
        return new Response(data.trim(), {
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
          },
        })
      }

      // If we can't extract a country code, return an error
      return new Response(JSON.stringify({ error: "Could not extract country code from response" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      })
    }
  } catch (error) {
    console.error(`Error in Cloudflare Worker: ${error.message || "Unknown error"}`)

    // Check if it's a timeout error
    if (error.message === "Request timeout") {
      return new Response(
        JSON.stringify({
          error: "Request timed out when connecting to the external API",
        }),
        {
          status: 504,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
          },
        },
      )
    }

    return new Response(
      JSON.stringify({
        error: `Failed to fetch data from external API: ${error.message || "Unknown error"}`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
  }
}

