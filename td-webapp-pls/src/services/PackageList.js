import qs from 'qs';
import { request, filterParam } from '../utils/request';
import * as url from '../config/url/PackageList';

export async function getPackageList(params) {
  const p = filterParam(params);
  return request(`${url.getPackageList}?${qs.stringify(p)}`, {
    method: 'GET',
  });
}

export async function queryTypeList(params) {
  const p = filterParam(params);
  return request(`${url.queryTypeList}?${qs.stringify(p)}`, {
    method: 'GET',
  });
}

export async function queryLevelList(params) {
  const p = filterParam(params);
  return request(`${url.queryLevelList}?${qs.stringify(p)}`, {
    method: 'GET',
  });
}

export async function getFavourableActivity(params) {
  const p = filterParam(params);
  return request(`${url.getFavourableActivity}?${qs.stringify(p)}`, {
    method: 'GET',
  });
}

export async function addPackage(params) {
  const p = filterParam(params);
  return request(`${url.addPackage}`, {
    method: 'PUT',
    body: `p=${JSON.stringify(p)}`,
  });
}

export async function deletePackage(params) {
  const p = filterParam(params);
  return request(`${url.deletePackage}/${p.id}`, {
    method: 'DELETE',
  });
}

export async function enablePackage(params) {
  const p = filterParam(params);
  return request(`${url.enablePackage}/${p.id}`, {
    method: 'PATCH',
  });
}

export async function disablePackage(params) {
  const p = filterParam(params);
  return request(`${url.disablePackage}/${p.id}`, {
    method: 'PATCH',
  });
}

export async function onlinePackage(params) {
  const p = filterParam(params);
  return request(`${url.onlinePackage}/${p.id}`, {
    method: 'PATCH',
  });
}

export async function offlinePackage(params) {
  const p = filterParam(params);
  return request(`${url.offlinePackage}/${p.id}`, {
    method: 'PATCH',
  });
}

export async function uploadLogo(params) {
  const p = filterParam(params);
  const formData = new FormData();
  for (const key in p) {
    if (p.hasOwnProperty(key)) { // eslint-disable-line
      formData.append(key, p[key]);
    }
  }
  return request(`${url.uploadLogo}`, {
    method: 'POST',
    body: formData,
  });
}

export async function getSmartPOSList(params) {
  const p = filterParam(params);
  return request(`${url.getSmartPOSList}?${qs.stringify(p)}`, {
    method: 'GET',
  });
}

export async function getCajasList(params) {
  const p = filterParam(params);
  return request(`${url.getCajasList}?${qs.stringify(p)}`, {
    method: 'GET',
  });
}

export async function getLogoBase64(params) {
  const p = filterParam(params);
  return request(`${url.getLogoBase64}?${qs.stringify(p)}`, {
    method: 'GET',
  });
}

export default {
  getPackageList,
  queryTypeList,
  queryLevelList,
  getFavourableActivity,
  addPackage,
  deletePackage,
  enablePackage,
  disablePackage,
  onlinePackage,
  offlinePackage,
  uploadLogo,
  getSmartPOSList,
  getCajasList,
  getLogoBase64,
};
