// Import required modules
const assert = require("assert");
// Import custom filters from the project
const filters = require("../../src/js/filters");

// Describe the test suite for custom filters
describe("Custom Filters", () => {
   // Describe the test suite for the 'getNewestCollectionItemDate' filter
   describe("getNewestCollectionItemDate", () => {
      // Test case: should return the correct date
      it("should return the correct date", () => {
         // Create a sample collection array with three items and different dates
         const collection = [
            { date: new Date("2023-01-01") },
            { date: new Date("2023-02-01") },
            { date: new Date("2023-03-01") },
         ];

         // Call the 'getNewestCollectionItemDate' filter with the sample collection
         const result = filters.getNewestCollectionItemDate(collection);

         // Assert that the returned result is equal to the expected newest date
         assert.strictEqual(result.toString(), new Date("2023-03-01").toString());
      });
   });

   describe("absoluteUrl", () => {
      it("should return the correct absolute URL", () => {
         const path = "/example";
         const baseUrl = "https://www.example.com";
         const result = filters.absoluteUrl(path, baseUrl);
         assert.strictEqual(result, "https://www.example.com/example");
      });

      it("should return the original path when an invalid URL is provided", () => {
         const path = "/example";
         const baseUrl = "not a valid URL";
         const result = filters.absoluteUrl(path, baseUrl);
         assert.strictEqual(result, path);
      });
   });

   describe("htmlToAbsoluteUrls", () => {
      it("should convert relative URLs to absolute URLs", () => {
         const content = '<a href="/example">Link</a>';
         const baseUrl = "https://www.example.com";
         const result = filters.htmlToAbsoluteUrls(content, baseUrl);
         assert.strictEqual(result, '<a href="https://www.example.com/example">Link</a>');
      });

      it("should not modify absolute URLs", () => {
         const content = '<a href="https://www.example.com/example">Link</a>';
         const baseUrl = "https://www.example.com";
         const result = filters.htmlToAbsoluteUrls(content, baseUrl);
         assert.strictEqual(result, content);
      });

      it("should return the original content when no base URL is provided", () => {
         const content = '<a href="/example">Link</a>';
         const result = filters.htmlToAbsoluteUrls(content, null);
         assert.strictEqual(result, content);
      });
   });
});
