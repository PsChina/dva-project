import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/sms/stlAudit';

const objectId = 'id';

// query reconciliation result list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// query doubt list
export async function queryOne(params) {
  const p = filterParam(params);
  console.log('p......', params);
  return request(`${url.queryOne}/${p[objectId]}`);
}

export async function transferAudit(params) {
  const p = filterParam(params);
  console.log('p......', params);
  return request(url.transferAudit, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateList, {
    method: 'put',
    body: qs.stringify(p),
  });
}

