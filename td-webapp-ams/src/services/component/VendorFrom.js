import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../config/url/component/VendorFrom';



export async function getPackageList(params){
    const p = filterParam(params);
    return request(`${url.packageList}?${qs.stringify(p)}`,{
        method:'GET'
    }); 
}

export async function getStoresList(params){
    const p = filterParam(params);
    return request(`${url.getStoresList}?${qs.stringify(p)}`,{
        method: 'GET'
    })
}

export async function getExtraPackageList(params){
    const p = filterParam(params);
    return request(`${url.getExtraPackageList}?${qs.stringify(p)}`,{
        method: 'GET'
    })
}

export async function getMerchantList(params){
    const p = filterParam(params);
    return request(`${url.getMerchantList}?${qs.stringify(p)}`,{
        method: 'GET'
    })
}