import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/sms/stlOrder';

/**
 * 划款记录
 */
const objectId = 'id';
// query check channel list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// query doubt one
export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}`);
}

// query doubt one
export async function batchOutAmt(params) {
  const p = filterParam(params);
  return request(`${url.batchOutAmt}?${qs.stringify(p)}`, { method: 'PUT' });
}

// query doubt one
export async function outAmt(params) {
  const p = filterParam(params);
  return request(`${url.outAmt}/${p[objectId]}`, { method: 'PUT' });
}