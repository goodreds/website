require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const stripe = require('stripe');
const { handler } = require('../../functions/createCheckoutSession');
const stripeInstance = stripe(process.env.STRIPE_TEST_KEY);

describe('createCheckoutSession.js', () => {
   let stripeStub;
   const validPriceId = 'price_1MV2EeBekdQelGMaIeYipI5C'; // Define a dummy valid price ID
   const customReferer = 'https://example.com'; // Define a custom referer

   beforeEach(() => {
      stripeStub = sinon.stub(stripe, 'Stripe').returns(stripeInstance);
      stripeInstance.checkout.sessions.create = sinon.stub().resolves({ url: 'https://stripe.com/valid_url' });
   });

   afterEach(() => {
      stripeStub.restore();
      sinon.spy(stripeInstance.checkout.sessions, 'create');
   });

   it('should create a checkout session with a valid price_id', async () => {
      const response = await handler({
         body: `price_id=${validPriceId}`,
         headers: {
            referer: customReferer,
         },
      }, {});

      expect(stripeStub.calledOnce).to.be.true;
      expect(response.statusCode).to.equal(303);
      expect(response.headers.Location).to.equal('https://stripe.com/valid_url');
   });

   it('should handle missing price_id', async () => {
      const response = await createCheckoutSessionHandler({
         body: '',
      }, {});

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.equal('Missing or invalid price_id');
   });

   it('should handle Stripe API call failure', async () => {
      const errorMessage = 'Stripe API error';
      stripeStub.rejects(new Error(errorMessage));

      const response = await createCheckoutSessionHandler({
         body: `price_id=${validPriceId}`,
      }, {});

      expect(response.statusCode).to.equal(500);
      expect(response.body).to.equal(errorMessage);
   });

});




