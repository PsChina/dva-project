import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/tms/terminalStock';
import * as logUrl from '../../../config/url/tms/terminalLog';
import * as companyUrl from '../../../config/url/tms/terminalCompany';
import * as firmware from '../../../config/url/tms/terminalFirmware';
import * as modelUrl from '../../../config/url/tms/terminalModel';
import * as tempUrl from '../../../config/url/tms/terminalParamTemp';

const objectId = 'terId';

export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function queryOne(params) {
  const p = filterParam(params);
  return request(`${url.queryOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateList, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

export async function stockAddBatch(params) {
  const p = filterParam(params);
  return request(url.addBatch, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function stockAddBatchExcel(params) {
  const p = filterParam(params);
  return request(url.addBatchExcel, {
    method: 'post',
    body: qs.stringify(p),
  });
}

export async function stocksOut(params) {
  const p = filterParam(params);
  return request(url.stocksOut, {
    method: 'put',
    body: qs.stringify(p),
  });
}

export async function recoveryList(params) {
  const p = filterParam(params);
  return request(url.recoveryList, {
    method: 'put',
    body: qs.stringify(p),
  });
}
export async function queryLogs(params) {
  const p = filterParam(params);
  return request(`${logUrl.queryListByTerId}?${qs.stringify(p)}`);
}

export async function queryTerVerSelect(params) {
  const p = filterParam(params);
  return request(`${firmware.querySelect}?${qs.stringify(p)}`);
}
export async function queryTerVerSelectByCop(params) {
  const p = filterParam(params);
  return request(`${firmware.querySelectByCop}?${qs.stringify(p)}`);
}

export async function querySelect(params) {
  const p = filterParam(params);
  return request(`${companyUrl.querySelect}?${qs.stringify(p)}`);
}

export async function queryModelSelect(params) {
  const p = filterParam(params);
  return request(`${modelUrl.querySelect}?${qs.stringify(p)}`);
}

export async function queryTempSelect(params) {
  const p = filterParam(params);
  return request(`${tempUrl.querySelect}?${qs.stringify(p)}`);
}
