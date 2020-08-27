import { request } from 'strapi-helper-plugin';
import pluginId from '../pluginId';

const loadConfig = async () => {
  const { config } = await request(`/${pluginId}/config`);
  return config;
}

export default loadConfig;
