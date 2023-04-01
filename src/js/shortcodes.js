// Cloudinary configuration
const CLOUDNAME = "goodreds";
const BASE_URL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/`;
const FOLDER = "/v1671446174/goodreds-netlify/";
const GALLERY_FOLDER = "products/";
const FALLBACK_WIDTHS = [375, 639, 767, 1023, 1279, 3000];
const FALLBACK_WIDTH = 639;
const SEO_ASPECT_RATIOS = ["1:1", "4:3", "16:9"];

// Function to generate srcset string for an image
function getSrcset(file, widths) {
   const widthSet = widths ? widths : FALLBACK_WIDTHS;
   return widthSet.map(width => {
      return `${getSrc(file, width)} ${width}w`;
   }).join(", ");
}

// Function to generate URL for an image
function getSrc(file, width) {
   return `${BASE_URL}c_crop,g_auto,q_auto,f_auto,ar_1.0,w_${width ? width : FALLBACK_WIDTH}${FOLDER}${GALLERY_FOLDER}${file}`;
}

// Function to generate URL for a full-size image with the specified aspect ratio
function fullSizeCrop(file, aspectRatio) {
   return `${BASE_URL}q_auto,ar_${aspectRatio},c_crop/${FOLDER}${file}`;
}

// Exported functions
module.exports = {
   // Generate srcset string for an image
   srcset: (file, widths) => getSrcset(file, widths),
   // Generate URL for an image
   src: (file, width) => getSrc(file, width),
   // Generate JSON string containing full-size image URLs with the specified aspect ratios
   seoImages: (file) => {
      const imageSet = SEO_ASPECT_RATIOS.map(aspectRatio => fullSizeCrop(file, aspectRatio));
      return JSON.stringify(imageSet);
   },
   // Function to generate URL for social media image (not implemented in this module)
   socialImage: (title, description) => socialImageUrl(title, description),
};
