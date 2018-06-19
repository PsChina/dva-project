import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../config/url/component/AddOrderModal';

export async function getPackageList(params){
    const p = filterParam(params);
    return request(`${url.getPackageList}?${qs.stringify(p)}`,{
        method:'GET'
    }); 
}

export async function getBankList(params){
    const p = filterParam(params);
    return request(`${url.getBankList}?${qs.stringify(p)}`,{
        method: 'GET'
    })
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

export async function getLogoBase64(params){
    const p = filterParam(params);
    return request(`${url.getLogoBase64}?${qs.stringify(p)}`,{
        method: 'GET'
    })
}

export async function getPartnerList(params){
    const p = filterParam(params);
    return request(`${url.getPartnerList}?${qs.stringify(p)}`,{
        method: 'GET'
    }) 
}