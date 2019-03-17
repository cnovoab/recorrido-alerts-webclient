import createCrudModule, { client } from 'vuex-crud';
import config from 'config';
import { authHeader } from '../_helpers';

client.interceptors.request.use(function(config){
  config.headers.Authorization = authHeader();
  return config;
})

export default createCrudModule({
  resource: 'reminders',
  customUrlFn(id) {
    const rootUrl = `${config.apiUrl}/alerts`;
    return id ? `rootUrl/${id}` : rootUrl;
  },
  client
});
