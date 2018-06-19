import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/merp/bankcardOrder';

const objectId = 'txnNo';
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}`);
}

// export async function updateList(params) {
//   const p = filterParam(params);
//   return request(url.updateListStatus, {
//     method: 'put',
//     body: qs.stringify(p),
//   });
// }
// export async function transferOrder(params) {
//   const p = filterParam(params);
//   return request(url.transferOrder, {
//     method: 'put',
//     body: qs.stringify(p),
//   });
// }

