import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/rms/warnRuleUrl';

const objectId = 'tmpId';
const objectIds = 'ruleId';


export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryMessages(params) {
  const p = filterParam(params);
  return request(`${url.queryMessages}?${qs.stringify(p)}`);
}

export async function ruleDetail(params) {
  const p = filterParam(params);
  return request(`${url.ruleDetail}?${qs.stringify(p)}`);
}

export async function configMess(params) {
  const p = filterParam(params);
  return request(`${url.configMess}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
export async function addOne(params) {
  const p = filterParam(params);
  return request(`${url.addOne}/${p[objectId]}`, {
    method: 'post',
    body: qs.stringify(p),
  });
}
export async function updateState(params) {
  const p = filterParam(params);
  return request(url.updateState, {
    method: 'put',
    body: qs.stringify(p),
  });
}
export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectIds]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
export async function queryRuleGroups(params) {
  const p = filterParam(params);
  return request(`${url.queryRuleGroups}?${qs.stringify(p)}`);
}
export async function queryGroup(params) {
  const p = filterParam(params);
  return request(`${url.queryGroup}?${qs.stringify(p)}`);
}
export async function addWarnGroup(params) {
  const p = filterParam(params);
  // console.log('333', params.ruleId);
  return request(`${url.addWarnGroup}/${p[objectIds]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}












