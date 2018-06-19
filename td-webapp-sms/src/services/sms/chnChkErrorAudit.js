import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/sms/chnChkErrorAudit';

const objectId = 'dealId';

// query reconciliation result list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// audit error deal
export async function auditErrorDeal(params) {
  const p = filterParam(params);
  return request(`${url.auditErrorDeal}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function queryAuditHis(params) {
  const p = filterParam(params);
  return request(`${url.queryAuditHis}/${p[objectId]}`);
}
