import { request } from 'strapi-helper-plugin';
import pluginId from '../pluginId';

const loadKey = async () => {
  const { apiKey } = await request(`/${pluginId}/settings`);
  return apiKey;
}

export default loadKey;
