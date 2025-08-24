/** @type {import('next').NextConfig} */
const nextConfig = {
  //TODO: These settings are for GitHub Pages. When hosting to a different platform I will need to change it.
  basePath: "/clocks",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
}

module.exports = nextConfig
