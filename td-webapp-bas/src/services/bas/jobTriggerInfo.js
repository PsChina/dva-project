import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/bas/jobTriggerInfo';

const objectId = 'id';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?pageNum= ${p.currentPage}`, {
    method: 'get',
    noEncrypt: true,
  });
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne} / ${p[objectId]} ? ${qs.stringify(p)}`);
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
  return request(`${url.deleteList} ? ${qs.stringify(p)}`, {
    method: 'delete',
  });
}
export async function updateOne(params) {
  const p = filterParam(params);
  return request(url.updateOne, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function excute(params) {
  const p = filterParam(params);
  return request(`${url.excute} ? ${qs.stringify(p)}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function pause(params) {
  const p = filterParam(params);
  return request(`${url.pause} ? ${qs.stringify(p)}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
export async function recovery(params) {
  const p = filterParam(params);
  return request(`${url.recovery} ? ${qs.stringify(p)}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
