// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const handler = async (event) => {
  const paymentIntent = await stripe.paymentIntents.create({
    
    amount: 1099,
    currency: "usd",
 //you can add any extra information in metadata
    metadata: { integration_check: "accept_a_payment" },
  });
  try {
    const subject = event.queryStringParameters.name || "World";
    return {
      statusCode: 200,
      body: JSON.stringify({ client_secret: paymentIntent.client_secret }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };             
  }
};

module.exports = { handler };
