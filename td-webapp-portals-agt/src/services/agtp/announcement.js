import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/agtp/announcement';

const objectId = 'annId';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryPageList}?${qs.stringify(p)}`);
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}?${qs.stringify(p)}`);
}
