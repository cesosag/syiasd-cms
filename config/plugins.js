const { contact } = require('./application')

module.exports = ({ env }) => ({
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: contact.email,
      defaultReplyTo: contact.email,
    },
  },
})
