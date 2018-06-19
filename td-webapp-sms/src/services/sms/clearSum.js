import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/sms/clearSum';

/**
 * 平台清分查询
 */
// query check channel list
const objectId = 'id';
export async function queryPlatformList(params) {
  const p = filterParam(params);
  return request(`${url.queryPlatformList}?${qs.stringify(p)}`);
}

// query doubt one
export async function queryPlatformOne(params) {
  const p = filterParam(params);
  return request(`${url.queryPlatformOne}/${p[objectId]}`);
}
export async function queryPlatformTransactonList(params) {
  const p = filterParam(params);
  return request(`${url.queryPlatformTransactonList}?${qs.stringify(p)}`);
}

/**
 * 渠道清分
 */
export async function queryChannelList(params) {
  const p = filterParam(params);
  return request(`${url.queryChannelList}?${qs.stringify(p)}`);
}

// query doubt one
export async function queryChannelOne(params) {
  const p = filterParam(params);
  return request(`${url.queryChannelOne}/${p.id}?${p}`);
}

// query doubt one
export async function queryChannelTransactonList(params) {
  const p = filterParam(params);
  return request(`${url.queryChannelTransactonList}?${qs.stringify(p)}`);
}
