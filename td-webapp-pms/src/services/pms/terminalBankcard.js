import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/terminalBankcard';

const objectId1 = 'chnTermNo';
const objectId2 = 'chnMerNo';
const objectId3 = 'chnId';

// query terminal info list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// update terminal list status
export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// delete disabled terminal key list
export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

// add termianls
export async function addList(params) {
  const p = filterParam(params);
  return request(url.addList, {
    method: 'post',
    body: qs.stringify(p),
  });
}

// update terminal key info
export async function updateKey(params) {
  const p = filterParam(params);
  return request(`${url.updateKey}/${p[objectId1]}-${p[objectId2]}-${p[objectId3]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}
