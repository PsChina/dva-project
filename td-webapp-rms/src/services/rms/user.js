import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/rms/user';

// const objectId = 'merId';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function queryAgtList(params) {
  const p = filterParam(params);
  return request(`${url.queryAgtList}?${qs.stringify(p)}`);
}