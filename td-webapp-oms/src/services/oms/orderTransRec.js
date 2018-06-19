import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/oms/orderTransRec';
import * as bankcardUrl from '../../../config/url/oms/bankcardOrder';


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
export async function handleSrcTrans(params) {
  const p = filterParam(params);
  return request(url.handleSrcTrans, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function queryOrderDetail(params) {
  const p = filterParam(params);
  return request(`${bankcardUrl.queryOne}/10`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
