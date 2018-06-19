import qs from 'qs';
import { request, filterParam } from '../utils/request';
import * as url from '../../config/url/indexPageUrl';

// export async function querySysMenu(params) {
//   const p = filterParam(params);
//   return request(`${url.querySysMenu}?${qs.stringify(p)}`, {
//     noEncrypt: true,
//   });
// }

export async function querySysMenu(params) {
  const p = filterParam(params);
  return request(`${url.querySysMenu}?${qs.stringify(p)}`);
}

export async function login(params) {
  const p = filterParam(params);
  return request(`${url.userLogin}?${qs.stringify(p)}`);
}

export async function relogin(params) {
  const p = filterParam(params);
  return request(`${url.userLogin}?${qs.stringify(p)}`);
}

export async function logout(params) {
  const p = filterParam(params);
  return request(`${url.userLogout}?${qs.stringify(p)}`, {
    noEncrypt: true,
  });
}



