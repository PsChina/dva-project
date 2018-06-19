import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/agtp/terminal';

const objectId = 'verId';

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

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}`, {
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

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function queryAuthDetail(params) {
  const p = filterParam(params);
  return request(url.queryAuthDetail, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateAuth(params) {
  const p = filterParam(params);
  return request(url.updateAuth, {
    method: 'put',
    body: qs.stringify(p),
  });
}
