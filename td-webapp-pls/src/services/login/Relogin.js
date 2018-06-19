import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../config/url/Relogin';

export async function login(params) {
  const p = filterParam(params);
  return request(`${url.login}?${qs.stringify(p)}`, {
    method: 'GET',
  });
}

export default {
  login,
};
