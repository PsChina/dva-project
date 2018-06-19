import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/agtp/stlShrManage';

/**
 * 分润管理
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

export async function queryBusinessOne(params) {
  const p = filterParam(params);
  return request(`${url.queryBusinessOne}/${p[objectId]}`);
}

// query doubt one
export async function queryTransactonList(params) {
  const p = filterParam(params);
  return request(`${url.queryTransactonList}?${qs.stringify(p)}`);
}
