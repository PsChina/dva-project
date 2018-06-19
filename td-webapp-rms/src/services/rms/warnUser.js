import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/rms/warnUserUrl';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryWarnUserList}?${qs.stringify(p)}`);
}

export async function queryOrgList(params) {
  const p = filterParam(params);
  return request(`${url.queryOrgList}?${qs.stringify(p)}`);
}
// export async function queryOrgList(params) {
//   return request(`${url.queryOrgList}/${params.requestType}/${params.orgType}`, {
//     noencrypt: true,
//   });
// }

export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteWarnUsers}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateWarnUser}/${p.userId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addWarnUser, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateWarnUsers, {
    method: 'put',
    body: qs.stringify(p),
  });
}


export async function warnGroup(params) {
  const p = filterParam(params);
  return request(`${url.WarnGroup}?${qs.stringify(p)}`);
}

export async function configWarnGroup(params) {
  const p = filterParam(params);
  return request(`${url.configWarnGroup}/${p.userId}?${qs.stringify(p)}`);
}

export async function updateWarnGroup(params) {
  const p = filterParam(params);
  return request(`${url.updateWarnGroup}/${p.userId}?${qs.stringify(p.groupIds)}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}





