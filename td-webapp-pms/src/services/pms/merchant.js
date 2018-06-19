import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/merchant';

const objectId = 'merId';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}?${qs.stringify(p)}`);
  // return request(`${url.queryOne}/${p[objectId]}`, {
  //   method: 'get',
  //   body: qs.stringify(p),
  // });
}
