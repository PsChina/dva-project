import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/routerMerBankcard';
import * as Modurl from '../../../config/url/pms/routerModBankcard';

// const objectId = 'chnMerNo';

// query MerId`s routers
export async function queryOneList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}/${p.merId}?${qs.stringify(p)}`);
}
// query MerId`s routers
export async function queryRoutersList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}/${p.merId}?${qs.stringify(p)}`);
}

// query all Bankcard mers except this merId
export async function queryAllList(params) {
  const p = filterParam(params);
  return request(`${url.queryAll}/${p.merId}?${qs.stringify(p)}`);
}

// query MerId apply mods
export async function queryModList(params) {
  const p = filterParam(params);
  return request(`${Modurl.queryList}?${qs.stringify(p)}`);
}

// query all Bankcard mers except this modNo
export async function queryModAllMersList(params) {
  const p = filterParam(params);
  return request(`${url.queryModAllMersList}/${p.modNo}?${qs.stringify(p)}`);
}

// add one Bankcard router
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

export async function setDefualt(params) {
  const p = filterParam(params);
  return request(`${url.setDefualt}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function deleteOne(params) {
  const p = filterParam(params);
  // 去掉回传时 为空的字段
  const data = filterParam(p.data);
  p.data = data
  return request(`${url.deleteOne}/${p.data.chnMerNo}`, {
    method: 'delete',
    body: qs.stringify(p),
  });
}
