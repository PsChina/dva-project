import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/bms/merchantBusiness';

export async function queryBusiness(params, id) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${id}/business?${qs.stringify(p)}`);
}

export async function queryOneBusiness(params, id, type) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${id}/business/${type}?${qs.stringify(p)}`);
}

export async function offBusiness(params, id, type) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${id}/business/${type}/off?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

export async function onBusiness(params, id, type) {
  const p = filterParam(params);
  return request(`${url.addOne}/${id}/business/${type}/on`, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function updateBusiness(params, id, type) {
  const p = filterParam(params);
  return request(`${url.addOne}/${id}/business/${type}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
