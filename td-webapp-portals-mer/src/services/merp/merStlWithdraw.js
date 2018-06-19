import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/merp/stlReq';

const objectId = 'id';

// 查询商户可提现金额
export async function queryWithdrawalAmount(params) {
  const p = filterParam(params);
  return request(`${url.qryAmount}`);
}

// 商户提现
export async function withdraw(params) {
  const p = filterParam(params);
  return request(`${url.applyWithdraw}?${qs.stringify(p)}`);
}
