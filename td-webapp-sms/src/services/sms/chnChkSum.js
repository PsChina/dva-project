import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/sms/chnChkSum';

const objectId = 'chkSumId';

// query reconciliation result list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// query success check list
export async function querySuccessList(params) {
  const p = filterParam(params);
  return request(`${url.querySuccessList}?${qs.stringify(p)}`);
}

// query second summary list
export async function querySecList(params) {
  const p = filterParam(params);
  return request(`${url.querySecList}/${p[objectId]}`);
  // return request(url.querySecList);
}

