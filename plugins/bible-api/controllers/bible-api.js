'use strict';

const { setStore } = require('../services/bible-api');

/**
 * bible-api.js controller
 *
 * @description: A set of functions called "actions" of the `bible-api` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },
  
  getSettings: async (ctx) => {
    const { user } = ctx.state;
    if (user.roles[0].id != 1) {
      ctx.unauthorized('Only administrators can perform this action');
    }
    
    const pluginStore = setStore();
    
    const apiKey = await pluginStore.get({ key: 'apiKey' });
    
    ctx.send({
      apiKey: apiKey ? apiKey : ''
    })
  },

  updateSettings: async (ctx) => {
    const { user } = ctx.state;
    const { apiKey } = ctx.request.body;
    
    if (user.roles[0].id != 1) {
      ctx.unauthorized('Only administrators can perform this action');
    }
    
    if (!apiKey) {
      ctx.throw(400, 'Please provide an API Key')
    }
    
    const pluginStore = setStore();
    
    const result = await pluginStore.set({
      key: 'apiKey',
      value: apiKey
    });

    ctx.send({ result });
  },
  
  getConfig: async (ctx) => {
    const { user } = ctx.state;
    if (user.roles[0].id != 1) {
      ctx.unauthorized('Only administrators can perform this action');
    }
    
    const pluginStore = setStore();
    
    const config = await pluginStore.get({ key: 'config' });
    
    ctx.send({
      config: config ? config : {}
    })
  },
  
  updateConfig: async (ctx) => {
    const { user } = ctx.state;
    const { config } = ctx.request.body;
    
    if (user.roles[0].id != 1) {
      ctx.unauthorized('Only administrators can perform this action');
    }
    
    if (!config) {
      ctx.throw(400, 'Please provide an API Key')
    }
    
    const pluginStore = setStore();
    
    const result = await pluginStore.set({
      key: 'config',
      value: config
    });

    ctx.send({ result });
  }
};
