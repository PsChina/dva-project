import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/rms/warnGroupUrl';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryWarnGroupList}?${qs.stringify(p)}`);
}

export async function deleteList(params) {
  const p = filterParam(params);
  return request(url.deleteWarnGroups, {
    method: 'delete',
    body: qs.stringify(p),
  });
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateWarnGroup}/${p.grpId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addWarnGroup, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateWarnGroups, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function other() {
  return {};
}
