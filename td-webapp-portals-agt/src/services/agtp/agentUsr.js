import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/agtp/agentUsr';

const objectId = 'usrId';
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p.usrId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p.usrId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'DELETE',
  });
}

export async function queryUsrRoleInfo(params) {
  const p = filterParam(params);
  return request(`${url.queryUsrRoleInfo}?${qs.stringify(p)}`);
}

export async function assignUsrRole(params) {
  const p = filterParam(params);
  return request(`${url.assignUsrRole}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
