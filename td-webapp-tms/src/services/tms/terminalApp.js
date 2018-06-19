import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/tms/terminalApp';

const objectId = 'appId';

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

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectId]}`, {
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

export async function upload(params) {
  const p = filterParam(params);
  return request(`${url.upload}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
