# Gatsby Stripe Serverless Lambda

Lambda is a service offered through Amazon Web Services (AWS) that allows you to run code that would normally run on a server without having to provision or manage servers.

This is a function that performs a Stripe payment charge. It is secured with API Key generated on deployment of function. 

Written in Node.js, deployed with Serverless Framework.

## Getting started

To get started with the app, clone the repo and then install the needed modules:

```
$ git clone https://github.com/salielim/stripe-payment-lambda.git
$ npm install
```

## Use your Stripe credentials

- Open stripe-payment-lambda in your code editor.
- Rename the `secrets.dev.example.json` file to `secrets.dev.json`, and `secrets.prod.example.json` file to `secrets.prod.json`.
- Replace the value of `stripeSecretKey` to your Stripe credentials.

## Configuring Serverless

Install the Serverless Framework:

```
npm install -g serverless
```

Provide your AWS credentials so that Serverless can make updates on AWS through the serverless tools:

```
$ serverless config credentials --provider aws --key YOUR_AWS_KEY --secret YOUR_SECRET_KEY
```

## Testing payments
Use Stripe's test credit card number `4242 4242 4242 4242`, with any future date of expiration, any email, and any 3 digit CVC code.

View logs of the function response in the terminal:

```
$ serverless logs -f <function-name> -t
```

## Deploy Your Lambda

Run the following to package and upload your function to AWS:

```
$ serverless deploy
```

Take note of the API Key that is returned in the output, use this key to call the Lambda from your frontend application.

```
Serverless: Stack update finished...
...
...
...
apiKeys:
  xxxxxxxxxxxxxxxxxx-key
```
