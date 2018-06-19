import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/sms/chnChkDoubt';

// query reconciliation result list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// query doubt list
export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}?${qs.stringify(p)}`);
}

