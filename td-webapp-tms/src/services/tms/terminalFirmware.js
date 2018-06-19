import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/tms/terminalFirmware';
import * as companyUrl from '../../../config/url/tms/terminalCompany';
import * as modelUrl from '../../../config/url/tms/terminalModel';

const objectId = 'verId';

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

export async function upload(params) {
  const p = filterParam(params);
  return request(`${url.upload}/${p[objectId]}`, {
    method: 'put',
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

export async function querySelect(params) {
  const p = filterParam(params);
  return request(`${companyUrl.querySelect}?${qs.stringify(p)}`);
}

export async function queryModelSelect(params) {
  const p = filterParam(params);
  return request(`${modelUrl.queryList}?${qs.stringify(p)}`);
}
