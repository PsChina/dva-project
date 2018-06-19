import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/merp/merchantStoreUsr';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryBras(params) {
  const p = filterParam(params);
  return request(`${url.queryBras}`);
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p.usrId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(`${url.addOne}`, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}
