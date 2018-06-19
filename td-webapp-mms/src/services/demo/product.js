import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/demo/product';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryProductList}?${qs.stringify(p)}`);
}

export async function deleteList(params) {
  const p = filterParam(params);
  return request(url.deleteProducts, {
    method: 'delete',
    body: qs.stringify(p),
  });
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateProduct}/${p.prodId}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addProduct, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateProducts, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function other() {
  return {};
}
