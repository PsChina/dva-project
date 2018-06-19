import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/bas/modelMain';

const objectId = 'modelno';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}?${qs.stringify(p)}`);
}


export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function deleteOne(params) {
  const p = filterParam(params);
  return request(`${url.deleteOne}?${qs.stringify(p)}`, {
    method: 'DELETE',
  });
}

export async function updateListStatus(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}


export async function disableModelMain(params) {
  const p = filterParam(params);
  return request(url.disableModelMain, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(url.updateOne, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function buildModelPathPre(params) {
  const p = filterParam(params);
  return request(`${url.buildModelPathPre}?${qs.stringify(p)}`);
}

export async function buildModelPath(params) {
  const p = filterParam(params);
  return request(`${url.buildModelPath}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
