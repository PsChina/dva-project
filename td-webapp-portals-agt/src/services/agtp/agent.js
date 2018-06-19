import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/agtp/agent';

const objectId = 'agtId';
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateBase(params) {
  const p = filterParam(params);
  return request(`${url.updateBase}/${p[objectId]}/base`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateAcc(params) {
  const p = filterParam(params);
  return request(`${url.updateAcc}/${p[objectId]}/acc`, {
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

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function agtApply(params) {
  const p = filterParam(params);
  return request(url.agtApply, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function agtLogo(params) {
  const p = filterParam(params);
  return request(`${url.agtLogo}?${qs.stringify(p)}`);
}
