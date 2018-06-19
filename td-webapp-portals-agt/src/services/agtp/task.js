import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/agtp/task';

export async function queryTaskTodoList(params) {
  const p = filterParam(params);
  return request(`${url.queryTaskTodoList}?${qs.stringify(p)}`);
}

export async function queryTaskMyApplyList(params) {
  const p = filterParam(params);
  return request(`${url.queryTaskMyApplyList}?${qs.stringify(p)}`);
}

export async function queryTaskMyFinishList(params) {
  const p = filterParam(params);
  return request(`${url.queryTaskMyFinishList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}?${qs.stringify(p)}`);
}

export async function updateAgree(params) {
  const p = filterParam(params);
  return request(`${url.updateAgree}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
export async function updateReject(params) {
  const p = filterParam(params);
  return request(`${url.updateReject}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function queryAuditHis(params) {
  const p = filterParam(params);
  return request(`${url.queryAuditHis}?${qs.stringify(p)}`);
}

