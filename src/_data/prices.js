const api_key = process.env.STRIPE_TEST_KEY
const stripe = require("stripe")(api_key)

// One product can have multiple prices but in this case it's 1:1 so this is the easiest way to pull in products
async function getPrices() {
   const response = await stripe.prices.list({
      expand: ["data.product"],
   })
   return response.data.filter(price => price.active)
}

// TODO: Add try/catch block to catch any errors on buile
module.exports = async function () {
   return await getPrices()
}
