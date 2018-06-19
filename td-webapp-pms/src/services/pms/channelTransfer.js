import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/channelTransfer';

const objectId = 'chnId';

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
  return request(url.updateList, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

// query channel select list
export async function querySelect(params) {
  const p = filterParam(params);
  return request(`${url.querySelect}?${qs.stringify(p)}`);
}

export async function queryBankList(params) {
  const p = filterParam(params);
  return request(`${url.queryBankList}?${qs.stringify(p)}`);
}

export async function setDefualt(params) {
  const p = filterParam(params);
  return request(`${url.setDefualt}/${p.data.chnId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateBank(params) {
  const p = filterParam(params);
  return request(`${url.updateBank}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
