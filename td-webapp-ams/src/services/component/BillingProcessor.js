import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../config/url/component/BillingProcessor';


export async function getOrderList(params){
    const p = filterParam(params);
    return request(`${url.orderList}?${qs.stringify(p)}`,{
        method:'GET'
    }); 
}

export async function confirmOrder(params){
    const p = filterParam(params);
    return request(`${url.confirmOrder}${p}`,{
        method:'PATCH'
    }); 
}

export async function confirmOrders(params){
    const p = filterParam(params);
    return request(`${url.confirmOrders}`,{
        method:'PATCH',
        body:p
    }); 
}

export async function putOrder(params){
    let p = filterParam(params);
    p = `p=${JSON.stringify(p)}`;
    return request(`${url.putOrder}`,{
        method:'PUT',
        body:p
    }); 
}