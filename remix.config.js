/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  // Use /docs as the base path for the documentation
  assetsBuildDirectory: "public/docs-assets/build",
  publicPath: "/docs-assets/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"],
};
