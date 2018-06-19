import qs from 'qs';
import { request, filterParam } from '../utils/request';
import * as url from '../../config/url/loginUrl';

export async function login(params) {
  const p = filterParam(params);
  return request(`${url.userLogin}?${qs.stringify(p)}`);
}

// export async function login(params) {
//   const p = filterParam(params);
//   return request(`${url.userLogin}?${qs.stringify(p)}`, {
//     noEncrypt: true,
//   });
// }
