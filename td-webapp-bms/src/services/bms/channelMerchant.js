import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/bms/channelMerchant';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}/select?${qs.stringify(p)}`);
}
