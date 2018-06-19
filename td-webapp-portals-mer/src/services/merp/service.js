import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/merp/merchant';

export async function updatePwd(params) {
  const p = filterParam(params);
  return request(`${url.updatePwd}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
