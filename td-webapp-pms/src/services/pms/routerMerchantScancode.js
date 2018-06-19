import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/routerMerScancode';
import * as Modurl from '../../../config/url/pms/routerModScancode'

// const objectId = 'chnMerNo';

// query MerId`s routers
export async function queryOneList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}/${p.merId}?${qs.stringify(p)}`);
}
// query MerId`s select options routers
export async function queryAllList(params) {
  const p = filterParam(params);
  return request(`${url.queryScancodeAll}/${p.data.merId}?${qs.stringify(p)}`);
}
// query MerId apply mods
export async function queryModList(params) {
  const p = filterParam(params);
  return request(`${Modurl.queryList}?${qs.stringify(p)}`);
}


export async function queryRoutersList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}/${p.merId}?${qs.stringify(p)}`);
}


// query all wechat Merchants list except this modNo
export async function queryModWechatAllList(params) {
  const p = filterParam(params);
  return request(`${url.queryWechatAll}/${p.modNo}?${qs.stringify(p)}`);
}
// query all alipay Merchants list except this modNo
export async function queryModAlipayAllList(params) {
  const p = filterParam(params);
  return request(`${url.queryAlipayAll}/${p.modNo}?${qs.stringify(p)}`);
}
// query all GamaPay Merchants list except this modNo
export async function queryModGamaPayAllList(params) {
  const p = filterParam(params);
  return request(`${url.queryGamapayAll}/${p.modNo}?${qs.stringify(p)}`);
}
// set one Scancode router defualt
export async function setDefualt(params) {
  const p = filterParam(params);
  return request(`${url.setDefualt}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(`${url.addOne}/${p.merId}`, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function addOneMod(params) {
  const p = filterParam(params);
  return request(`${url.addOneMod}/${p.modNo}`, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function deleteOne(params) {
  const p = filterParam(params);
  return request(`${url.deleteOne}/${p.chnMerId}`, {
    method: 'delete',
    body: qs.stringify(p),
  });
}
