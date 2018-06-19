import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/tms/terminalParamTemp';

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

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.operateOne}/${p.id}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function deleteOne(params) {
  const p = filterParam(params);
  return request(`${url.operateOne}/${p.id}`, {
    method: 'delete',
  });
}
