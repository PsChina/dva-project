import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/sms/channel';

// query check channel list
export async function querySelect(params) {
  const p = filterParam(params);
  return request(`${url.querySelect}?${qs.stringify(p)}`);
}
