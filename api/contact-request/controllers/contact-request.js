'use strict'
const { sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity = await strapi.services['contact-request'].create(ctx.request.body)
    entity = sanitizeEntity(entity, { model: strapi.models['contact-request'] })
    try {
      const send = await strapi.plugins['email'].services.email.send({
        personalizations: [{
          to: [{
            email: strapi.config.application.contact.email,
            name: strapi.config.application.contact.name,
          }],
          subject: strapi.config.application.contact.subject,
          dynamic_template_data: entity,
        }],
        template_id: strapi.config.application.contact.template_id,
      })
    } catch (err) {
      if (err && err.response && err.response.body) console.error('Sendgrid reported an error: ', err.response.body.errors)
      else console.error(err)
    }
    return entity
  },
}
