import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/mms/merchantStore';
import * as merchantUrl from '../../../config/url/mms/merchant';

const objectId = 'braId';
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
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

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function storeApply(params) {
  const p = filterParam(params);
  return request(url.storeApply, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function queryMerchantList(params) {
  const p = filterParam(params);
  return request(`${merchantUrl.queryList}?${qs.stringify(p)}`);
}
