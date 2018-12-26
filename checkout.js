const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  const requestData = JSON.parse(event.body)
  const amount = requestData.amount
  const token = requestData.token.id
  const description = requestData.description
  const email = requestData.token.email
  const metadata = requestData.metadata || "none"

  // Headers to prevent CORS issues
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  }

  if (!amount || !token || !description | !metadata) {
    const response = {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        message: `Missing parameters`
      })
    }
    callback(null, response)
  }

  return stripe.charges
    .create({
      amount,
      source: token,
      currency: "sgd",
      description: description,
      receipt_email: email
    })
    .then(charge => {
      const response = {
        headers,
        statusCode: 200,
        body: JSON.stringify({
          message: `Charge is successful`,
          charge
        })
      }
      callback(null, response)
    })
    .catch(err => {
      const response = {
        headers,
        statusCode: 500,
        body: JSON.stringify({
          error: err.message
        })
      }
      callback(null, response)
    })
}