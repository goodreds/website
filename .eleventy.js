// Import required modules
const { DateTime } = require("luxon");
const now = String(Date.now());
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const filters = require("./src/js/filters");
const shortcodes = require("./src/js/shortcodes");
const Image = require("@11ty/eleventy-img");
const path = require('path');
const { URL } = require("url");

// Load environment variables
require("dotenv").config();

module.exports = function (eleventyConfig) {
  // Add filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Add plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Set Nunjucks environment options
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false,
  });

  // Add shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("version", function () {
    return now;
  });

  // Add Nunjucks filters
  eleventyConfig.addNunjucksFilter("dateToRfc3339", function (date) {
    return DateTime.fromJSDate(date).toISO();
  });

  // Add Eleventy Image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("eleventyImage", async function (src, alt, attributes) {
    // ... (the existing Eleventy Image shortcode code)
  });

  // Add watch targets
  eleventyConfig.addWatchTarget("./tailwind.config.js");
  eleventyConfig.addWatchTarget("./src/css/tailwind.css");
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("./src/_includes/_components/*");

  // Passthrough file copy
  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "css/style.css" });
  eleventyConfig.addPassthroughCopy({ "./.github/dependabot.yml": "./.github/dependabot.yml" });
  // Added to copy the workflow files to the _site folder, which runs Github Actions in the repo.
  eleventyConfig.addPassthroughCopy({ "./.github/workflows/*": "./.github/workflows/" });
  eleventyConfig.addPassthroughCopy({ "./package-lock.json": "package-lock.json" });
  eleventyConfig.addPassthroughCopy({ "./node_modules/alpinejs/dist/cdn.min.js": "js/alpine.js" });
  eleventyConfig.addPassthroughCopy({ "./node_modules/@alpinejs/collapse/dist/cdn.min.js": "js/collapse.js" });
  eleventyConfig.addPassthroughCopy({
    "./src/js/mask.js": "js/mask.js",
    "./src/js/filters.js": "js/filters.js",
    "./src/js/shortcodes.js": "js/shortcodes.js",
    "./src/js/three.min.js": "js/three.min.js",
    "./src/js/vanta.fog.min.js": "js/vanta.fog.min.js",
  });
  eleventyConfig.addPassthroughCopy({ "./src/_assets/_video/*.{webm,mp4,ogv}": "_assets/_video" });
  eleventyConfig.addPassthroughCopy({ "./src/_assets/_icons/_favicons/*": "/" });
  eleventyConfig.addPassthroughCopy({ "./src/_assets/_icons/*.svg": "_assets/_icons" });
  eleventyConfig.addPassthroughCopy({ "./src/_assets/_images/*": "_assets/_images" });
  eleventyConfig.addPassthroughCopy({ "./src/_assets/_images/_sections/*": "_assets/_images/_sections" });

  eleventyConfig.addPassthroughCopy({ "./src/news/images/*": "news/images" });
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy({ "_assets/*": "_assets/" });

  // Dev Server 1.0 options
  eleventyConfig.setServerOptions({
    // Default values are shown:

    // Whether the live reload snippet is used
    liveReload: true,

    // Whether DOM diffing updates are applied where possible instead of page reloads
    domDiff: true,

    // The starting port number
    // Will increment up to (configurable) 10 times if a port is already in use.
    port: 8080,

    // Additional files to watch that will trigger server updates
    // Accepts an Array of file paths or globs (passed to `chokidar.watch`).
    // Works great with a separate bundler writing files to your output folder.
    // e.g. `watch: ["_site/**/*.css"]`
    watch: [],

    // Show local network IP addresses for device testing
    showAllHosts: false,

    // Use a local key/certificate to opt-in to local HTTP/2 with https
    https: {
      // key: "./localhost.key",
      // cert: "./localhost.cert",
    },

    // Change the default file encoding for reading/serving files
    encoding: "utf-8",

    // Show the dev server version number on the command line
    showVersion: false,
  });

  // Add delay before reloading the page - this stops the reload from serving up an incomplete page
  eleventyConfig.setWatchThrottleWaitTime(1000); // in milliseconds

  // Set input/output directories and template formats
  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
    templateFormats: [
      "ico",
      "md",
      "njk",
      "html",
      "svg",
      "avif",
      "woff",
      "woff2",
      "ttf"
    ],
    addPassthroughCopy: true,
  };
};
