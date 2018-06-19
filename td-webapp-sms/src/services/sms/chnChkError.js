import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/sms/chnChkError';

// query reconciliation result list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// query error list
export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}?${qs.stringify(p)}`);
}

// deal error
export async function dealError(params) {
  const p = filterParam(params);
  return request(url.dealError, {
    method: 'put',
    body: qs.stringify(p),
  });
}

