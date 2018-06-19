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

export async function queryHisCount(params) {
  const p = filterParam(params);
  return request(`${url.queryHisCount}?${qs.stringify(p)}`);
}

export async function queryTodayCount(params) {
  const p = filterParam(params);
  return request(`${url.queryTodayCount}?${qs.stringify(p)}`);
}

export async function queryStoreCount(params) {
  const p = filterParam(params);
  return request(`${url.queryStoreCount}?${qs.stringify(p)}`);
}

export async function queryTermCount(params) {
  const p = filterParam(params);
  return request(`${url.queryTermCount}?${qs.stringify(p)}`);
}

export async function querySettleCount(params) {
  const p = filterParam(params);
  return request(`${url.querySettleCount}?${qs.stringify(p)}`);
}

export async function other() {
  return {};
}
