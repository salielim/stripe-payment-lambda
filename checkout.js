const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  console.log('creating stripe charge...');

  // Pull out the amount and id for the charge from the POST
  console.log(event);
  const requestData = JSON.parse(event.body);
  console.log(requestData);
  const amount = requestData.amount;
  const token = requestData.token.id;
  const description = requestData.description;
  const metadata = requestData.metadata || 'none';

  // Headers to prevent CORS issues
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (!amount || !token || !description | !metadata) {
    const response = {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        message: `Missing parameters`
      })
    };
    callback(null, response);
  }

  console.log('data: ', {
    amount,
    source: token,
    currency: 'usd',
    description: description,
    metadata: metadata,
    statement_descriptor: 'Noderite'
  })

  return stripe.charges
    .create({
      // Create Stripe charge with token
      amount,
      source: token,
      currency: 'usd',
      description: description,
      // metadata: metadata,
      // statement_descriptor: 'Noderite'
    })
    .then(charge => {
      // Success response
      console.log(charge);
      const response = {
        headers,
        statusCode: 200,
        body: JSON.stringify({
          message: `Charge is successful`,
          charge
        })
      };
      callback(null, response);
    })
    .catch(err => {
      // Error response
      console.log(err);
      const response = {
        headers,
        statusCode: 500,
        body: JSON.stringify({
          error: err.message
        })
      };
      callback(null, response);
    });
};
