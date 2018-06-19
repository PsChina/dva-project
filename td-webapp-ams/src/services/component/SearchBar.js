import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../config/url/component/BillingProcessor';


export async function getOrderList(params){
    const p = filterParam(params);
    return request(`${url.orderList}?${qs.stringify(p)}`,{
        method:'GET'
    }); 
}
