import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/routerModScancode';

//------------------------------- Mods
// query mods list scancode
export async function queryModList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}
// check modNo not used
export async function checkModNo(params) {
  const p = filterParam(params);
  return request(`${url.checkModNo}/${p.modNo}?${qs.stringify(p)}`);
}

// add one Mod
export async function addOneMod(params) {
  const p = filterParam(params);
  return request(`${url.addOne}`, {
    method: 'post',
    body: qs.stringify(p),
  });
}

// update one Mod
export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p.modNo}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// delete one Mod
// export async function deleteOneMod(params) {
//   const p = filterParam(params);
//   return request(`${url.deleteOne}/${p.merId}`, {
//     method: 'delete',
//     body: qs.stringify(p),
//   });
// }

//------------------------------------- Mod`s routers
// query one mod`s routers List
export async function queryModRoutersList(params) {
  const p = filterParam(params);
  return request(`${url.queryModRoutersList}/${p.modNo}?${qs.stringify(p)}`);
}

// add one mod`s router Mer
export async function addOneModMer(params) {
  const p = filterParam(params);
  return request(`${url.addOneMer}/${p.modNo}`, {
    method: 'post',
    body: qs.stringify(p),
  });
}

// delete one mod`s router Mer
export async function deleteOneMer(params) {
  const p = filterParam(params);
  return request(`${url.deleteOneMer}/${p.chnMerId}`, {
    method: 'delete',
    body: qs.stringify(p),
  });
}

// set one mod`s Bankcard router defualt
export async function setDefualt(params) {
  const p = filterParam(params);
  return request(`${url.setDefualt}/${p.modNo}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
