const nextConfig = {
  //TODO: These settings are for GitHub Pages. When hosting to a different platform I will need to change it.
  basePath: "/clocks", //Makes sure the website will start on /clocks if going in from pages
  output: "export",  //enables static exports. Change to "standalone" when changing deployment from github pages
  reactStrictMode: true,
}

module.exports = nextConfig
