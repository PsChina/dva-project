import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/pms/channelScancode';

const objectId = 'chnId';

// query channel list
export async function queryList(params) {
  const p = filterParam(params);
  return request(`${url.queryList}?${qs.stringify(p)}`);
}

// add channel
export async function addOne(params) {
  const p = filterParam(params);
  return request(url.addOne, {
    method: 'post',
    body: qs.stringify(p),
  });
}

// update channel info
export async function updateOne(params) {
  const p = filterParam(params);
  return request(`${url.updateOne}/${p[objectId]}`, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// delete channel list
export async function deleteList(params) {
  const p = filterParam(params);
  return request(`${url.deleteList}?${qs.stringify(p)}`, {
    method: 'delete',
  });
}

// query channel select list
export async function querySelect(params) {
  const p = filterParam(params);
  return request(`${url.querySelect}?${qs.stringify(p)}`);
}

// enable or disable
export async function updateList(params) {
  const p = filterParam(params);
  return request(url.updateListStatus, {
    method: 'put',
    body: qs.stringify(p),
  });
}

// 上传图片
export async function uploadLogo(params){
  const p = filterParam(params);
  const formData = new FormData();
  for (const key in p) {
    if (p.hasOwnProperty(key)) { // eslint-disable-line
      formData.append(key, p[key]);
    }
  }
  // debugger;
  return request(`${url.uploadLogo}`, {
    method: 'POST',
    body: formData,
  });
}
// 预览图片
export async function getLogoBase64(params){
  const p = filterParam(params);
  return request(`${url.getLogoBase64}?${qs.stringify(p)}`,{
      method: 'GET'
  })
}