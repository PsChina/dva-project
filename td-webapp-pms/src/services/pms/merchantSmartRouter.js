import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/merchantSmartRouter';

const objectId1 = 'merId';
const objectId2 = 'txnChannel';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId1]}?${qs.stringify(p)}`);
}

export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(`${url.addOne}`, {
    method: 'post',
    body: qs.stringify(p),
  })
}
