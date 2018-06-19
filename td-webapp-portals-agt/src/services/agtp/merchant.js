import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/agtp/merchant';
import * as agentUrl from '../../../config/url/agtp/agent';

const objectId = 'merId';
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p.merId}`, {
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

export async function merchantApply(params) {
  const p = filterParam(params);
  return request(url.merchantApply, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function queryAgentList(params) {
  const p = filterParam(params);
  return request(`${agentUrl.queryList}?${qs.stringify(p)}`);
}

