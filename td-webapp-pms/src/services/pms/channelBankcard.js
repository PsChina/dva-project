import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/channelBankcard';

const objectId = 'chnId';

// query channel list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// add channel info
export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

// update channel info
export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// update channel list status
export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// delete disabled channel list
export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

// validate channel is repeat or not
export async function checkChnName(params) {
  const p = filterParam(params);
  return request(`${url.checkChnName}?${qs.stringify(p)}`);
}

// query channel select list
export async function querySelect(params) {
  const p = filterParam(params);
  return request(`${url.querySelect}?${qs.stringify(p)}`);
}

// update transaction auth info
export async function updateAuth(params) {
  const p = filterParam(params);
  return request(url.updateAuth, {
    method: 'put',
    body: qs.stringify(p),
  });
}
