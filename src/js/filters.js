module.exports = {
   convertCentsToDollars: (cents) => {
      return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })
   },
   readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
      return DateTime.fromISO(dateStr).toFormat(formatStr);
   },
   readableDate: dateObj => {
      return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
   },
   // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
   htmlDateString: (dateObj) => {
      return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
   },
   getNewestCollectionItemDate: (collection) => {
      if (collection && collection.length > 0) {
         return collection.sort((a, b) => b.date - a.date)[0].date;
      }
      return new Date();
   },
   absoluteUrl: (path, baseUrl) => {
      try {
         return new URL(path, baseUrl).toString();
      } catch (error) {
         return path;
      }
   },

   htmlToAbsoluteUrls: (content, baseUrl) => {
      if (!baseUrl || !content) {
         return content;
      }

      const base = new URL(baseUrl);

      return content.replace(/(href|src)="(?!http)([^"]+)"/g, function (match, attribute, value) {
         try {
            const url = new URL(value, base);
            return `${attribute}="${url.toString()}"`;
         } catch (error) {
            console.error("Error in htmlToAbsoluteUrls filter:", error);
            return match;
         }
      });
   },
}
