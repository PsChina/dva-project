import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/sms/clearBusiness';

/**
 * 业务清分
 */
// query check channel list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// query doubt one
export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}?${p.id}`);
}
