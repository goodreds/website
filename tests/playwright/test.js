const { chromium, firefox, webkit } = require('playwright');

(async () => {
   for (const browserType of [chromium, firefox, webkit]) {
      const browser = await browserType.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('https://example.com');
      // Perform your tests here
      const title = await page.title();
      console.assert(title === "Example Domain", "Title does not match!");

      await browser.close();
   }
})();

