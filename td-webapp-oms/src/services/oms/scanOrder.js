import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/oms/scanOrder';

const objectId = 'txnNo';
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}
export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
export async function exportList(params) {
  const p = filterParam(params);
  return request(`${url.exportList}?${qs.stringify(p)}`);
}

