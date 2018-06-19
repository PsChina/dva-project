import qs from 'qs';
import { request, filterParam } from '../utils/request';
import * as url from '../../config/url/loginPwdBack';

export async function sendCode(params) {
  const p = filterParam(params);
  return request(url.sendCode, {
    method: 'POST',
    body: qs.stringify(p),
  });
}
export async function validCode(params) {
  const p = filterParam(params);
  return request(`${url.validCode}?${qs.stringify(p)}`);
}

export async function setPassword(params) {
  const p = filterParam(params);
  return request(url.setPassword, {
    method: 'PUT',
    body: qs.stringify(p),
  });
}
