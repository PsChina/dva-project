import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/bas/user';
import * as orgUrl from '../../../config/url/bas/org';

const objectId = 'userId';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}?${qs.stringify(p)}`);
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
    method: 'delete',
  });
}

export async function updateListStatus(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function resetPwd(params) {
  const p = filterParam(params);
  return request(`${url.resetPwd}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updatePwd(params) {
  const p = filterParam(params);
  return request(`${url.updatePwd}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function unLock(params) {
  const p = filterParam(params);
  return request(`${url.unLock}`, {
    method: 'put',
    body: qs.stringify(p),
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

export async function queryOrgTree() {
  return request(`${orgUrl.queryList}`);
}

