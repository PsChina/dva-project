import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/tms/terminalParam';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.operateOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function deleteOne(params) {
  const p = filterParam(params);
  return request(`${url.operateOne}/${p.id}?${qs.stringify({ tempId: p.tempId })}`, {
    method: 'delete',
  });
}

export async function upOne(params) {
  const p = filterParam(params);
  return request(`${url.operateOne}/${p.id}/up`, {
    method: 'put',
    body: qs.stringify({ tempId: p.tempId }),
  });
}

export async function downOne(params) {
  const p = filterParam(params);
  return request(`${url.operateOne}/${p.id}/down`, {
    method: 'put',
    body: qs.stringify({ tempId: p.tempId }),
  });
}
