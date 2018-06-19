import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/mms/common';

/**
 * 查询总行联行号
 * 2017-03-20
 */
export async function queryBanklist(params) {
  const p = filterParam(params);
  return request(`${url.queryBanklist}?${qs.stringify(p)}`);
}

/**
 * 查询支行联行号
 * 2017-03-20
 */
export async function querySubBanklist(params) {
  const p = filterParam(params);
  return request(`${url.querySubBanklist}?${qs.stringify(p)}`);
}

/**
 * 查询业务员信息
 * 2017-03-21
 */
export async function queryBizSaleList(params) {
  const p = filterParam(params);
  return request(`${url.queryBizSaleList}?${qs.stringify(p)}`);
}
/**
 * 查询附件详情
 * 2017-03-21
 */
export async function queryAttach(params) {
  const p = filterParam(params);
  return request(`${url.queryAttach}?${qs.stringify(p)}`);
}

/**
 * 查询地区列表
 * 2017-03-21
 */
export async function queryPubAreaList(params) {
  const p = filterParam(params);
  return request(`${url.queryPubAreaList}?${qs.stringify(p)}`);
}
