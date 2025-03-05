/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  distDir: "out",
  images: {
    unoptimized: process.env.STATIC_EXPORT === "true",
  },
  // Ensure trailing slashes for static export compatibility
  trailingSlash: process.env.STATIC_EXPORT === "true",
}

module.exports = nextConfig

