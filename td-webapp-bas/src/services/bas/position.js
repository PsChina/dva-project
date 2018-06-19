import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/bas/position';

const objectId = 'positionno';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function deleteOne(params) {
  const p = filterParam(params).data;
  return request(`${url.deleteOne}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

export async function updateListStatus(params) {
  const p = filterParam(params);
  p.positionno = p.ids;
  p.positioncode = p.positioncodes;
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

export async function queryPositionRole(params) {
  const p = filterParam(params);
  return request(`${url.queryPositionRole}?${qs.stringify(p)}`);
}

export async function addPositionRole(params) {
  const p = filterParam(params);
  return request(`${url.addPositionRole}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

