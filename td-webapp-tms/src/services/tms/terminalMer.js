import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/tms/terminalMer';

const objectId = 'braId';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryTermList(params) {
  const p = filterParam(params);
  return request(`${url.queryTermList}/?${qs.stringify(p)}`);
}

export async function queryUnBindTermList(params) {
  const p = filterParam(params);
  return request(`${url.queryUnBindTermList}?${qs.stringify(p)}`);
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addBatch, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function addBatch(params) {
  const p = filterParam(params);
  return request(url.addBatch, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}?${qs.stringify(p)}`);
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
  return request(url.updateList, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.unBindBatch}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}
