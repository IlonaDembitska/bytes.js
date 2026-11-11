// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  mutate: ["index.js"],
  incremental: true,
  concurrency: 2,
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "mocha",
  testRunner_comment:
    "Take a look at https://stryker-mutator.io/docs/stryker-js/mocha-runner for information about the mocha plugin.",
  coverageAnalysis: "perTest",
};
export default config;
