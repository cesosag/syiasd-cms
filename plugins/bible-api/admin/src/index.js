import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import pluginLogo from './assets/api-logo.svg';
import App from './containers/App';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';

import React from 'react';

export default strapi => {
  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;
  
  const menuSection = {
    id: pluginId,
    title: {
      id: `${pluginId}.plugin.name`,
      defaultMessage: 'Bible API',
    },
    links: [
      {
        title: 'API Key',
        to: `${strapi.settingsBaseURL}/${pluginId}/api-key`,
        name: 'API Key',
        Component: () => <div>API Key</div>,
      }
    ]
  }

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    mainComponent: App,
    name,
    pluginLogo,
    preventComponentRendering: false,
    settings: {
      menuSection,
    },
    trads,
    menu: {
      pluginsSectionLinks: [
        {
          destination: `/plugins/${pluginId}`,
          icon,
          label: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: name,
          },
          name,
          permissions: [
            // Uncomment to set the permissions of the plugin here
            // {
            //   action: '', // the action name should be plugins::plugin-name.actionType
            //   subject: null,
            // },
          ],
        },
      ],
    },
  };

  return strapi.registerPlugin(plugin);
};
