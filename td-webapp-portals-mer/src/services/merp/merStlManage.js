import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/merp/stlReq';

const objectId = 'id';

// query reconciliation result list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// query doubt list
export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}`);
}

export async function qryStlDetail(params) {
  const p = filterParam(params);
  return request(`${url.qryStlBusinessDetail}?${qs.stringify(p)}`);
}

export async function qryStlOrdDetail(params) {
  const p = filterParam(params);
  return request(`${url.qryStlOrdDetail}?${qs.stringify(p)}`);
}

export async function queryBusinessOne(params) {
  const p = filterParam(params);
  return request(`${url.qryBusinessOne}/${p[objectId]}`);
}

export async function qryBusinessList(params) {
  const p = filterParam(params);
  return request(`${url.qryBusinessList}?${qs.stringify(p)}`);
}

export async function qryStlBusinessDetail(params) {
  const p = filterParam(params);
  return request(`${url.qryStlBusinessDetail}?${qs.stringify(p)}`);
}

export async function qryTradeDetailList(params) {
  const p = filterParam(params);
  return request(`${url.qryTradeDetailList}?${qs.stringify(p)}`);
}

export async function stlApplyForMoney(params) {
  const p = filterParam(params);
  return request(url.stlApplyForMoney, {
    method: 'put',
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

