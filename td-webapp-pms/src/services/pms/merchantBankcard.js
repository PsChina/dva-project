import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/merchantBankcard';

const objectId1 = 'chnMerNo';
const objectId2 = 'chnId';

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

// update merchant info
export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectId1]}-${p[objectId2]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// update merchant list status
export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// delete disabled merchant list
export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

// validate primary key is repeat or not
export async function checkChnMerNo(params) {
  const p = filterParam(params);
  return request(`${url.checkChnMerNo}?${qs.stringify(p)}`);
}

// update transaction auth info
export async function updateAuth(params) {
  const p = filterParam(params);
  return request(`${url.updateAuth}`, {
    method: 'put',
    body: qs.stringify(p),
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

// query select merchant
export async function querySelect(params) {
  const p = filterParam(params);
  return request(`${url.querySelect}?${qs.stringify(p)}`);
}
