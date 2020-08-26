'use strict';

/**
 * bible-api.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  setStore: () => strapi.store({
    environment: strapi.config.environment,
    type: 'plugin',
    name: 'bible-api'
  })
};
