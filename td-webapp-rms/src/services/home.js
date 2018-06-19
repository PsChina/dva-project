import qs from 'qs';
import { request, filterParam } from '../utils/request';
import * as url from '../../config/url/homeUrl';

export async function queryExpOrdInfo(params) {
  const p = filterParam(params);
  return request(`${url.queryExpOrdInfo}?${qs.stringify(p)}`);
}
export async function queryFaultTerInfo(params) {
  const p = filterParam(params);
  return request(`${url.queryFaultTerInfo}?${qs.stringify(p)}`);
}
export async function queryLackTerInfo(params) {
  const p = filterParam(params);
  return request(`${url.queryLackTerInfo}?${qs.stringify(p)}`);
}


export async function other() {
  return {};
}
