/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports only if STATIC_EXPORT is explicitly set to 'true'
  // Otherwise, use default Next.js behavior
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  // Disable image optimization only for static exports
  images: process.env.STATIC_EXPORT === "true" ? { unoptimized: true } : {},
  // Ensure trailing slashes are consistent
  trailingSlash: false,
  // Add environment variables that should be available at build time
  env: {
    // Add a fallback for VERCEL_URL if it's not set
    VERCEL_URL: process.env.VERCEL_URL || "",
    // Add a flag to indicate if we're in static export mode
    IS_STATIC: process.env.STATIC_EXPORT === "true" ? "true" : "false",
  },
}

module.exports = nextConfig
