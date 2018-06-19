import qs from 'qs';
import { request, filterParam } from '../utils/request';
import * as url from '../../config/url/menuUrl';

export async function query(params) {
  const p = filterParam(params);
  return request(`${url.queryMenus}?${qs.stringify(p)}`);
}

export async function loginOut(params) {
  const p = filterParam(params);
  return request(`${url.loginOut}?${qs.stringify(p)}`, {
    noEncrypt: true,
  });
}


export async function updatePsw(params) {
  const p = filterParam(params);
  console.log('pppp', p)
  return request(`${url.updatePsw}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
// export async function query(params) {
//   const p = filterParam(params);
//   return request(`${url.queryMenus}?${qs.stringify(p)}`, {
//     noEncrypt: true,
//   });
// }
