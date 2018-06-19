import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/merchantTransfer';

const objectId = 'chnId';

// query merchant list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// add merchant info
export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

// update merchant
export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// enable or disable
export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateList, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// delete disabled merchants
export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

// merchant import
export async function bussAddBatchExcel(params) {
  const p = filterParam(params);
  return request(url.addBatchExcel, {
    method: 'post',
    body: qs.stringify(p),
  });
}
