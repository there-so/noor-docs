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
  serverDependenciesToBundle: [
    "notion-client",
    "got",
    "notion-utils",
    "notion-types",
    "p-queue",
    "p-timeout",
    "p-memoize",
    "lqip-modern",
    "p-map",
    "is-url-superb",
    "mem",
    "mimic-fn",
    "react-notion-x",
  ],
};
