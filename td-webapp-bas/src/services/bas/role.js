import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/bas/role';

const objectId = 'roleId';

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

export async function queryRoleMenuInfo(params) {
  const p = filterParam(params);
  return request(`${url.queryRoleMenuInfo}?${qs.stringify(p)}`);
}

export async function assignRoleMenu(params) {
  const p = filterParam(params);
  return request(`${url.assignRoleMenu}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
