import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/merp/merchant';

export async function getMerInf(params) {
  const p = filterParam(params);
  return request(`${url.getMerInf}?${qs.stringify(p)}`);
}
