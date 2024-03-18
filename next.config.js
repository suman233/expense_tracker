/** @type {import('next').NextConfig} */

const path = require("path");

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: {
    domains: ["career-utility.dedicateddevelopers.us"]
  },
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
  devIndicators: {
    autoPrerender: false,
    buildActivityPosition: "bottom-right"
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_APP_TOKEN_NAME: process.env.NEXT_APP_TOKEN_NAME
  },
  typescript: { ignoreBuildErrors: false },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false
      }
    ];
  }
};
