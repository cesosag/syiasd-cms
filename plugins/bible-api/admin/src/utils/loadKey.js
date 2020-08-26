import { request } from 'strapi-helper-plugin';
import pluginId from '../pluginId';

const loadKey = async (setKey) => {
  const res = await request(`/${pluginId}/settings`);
  setKey(res.apiKey);
}

export default loadKey;
