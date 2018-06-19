import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/bms/agent';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p.agtId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
