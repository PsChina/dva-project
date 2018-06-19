
import qs from 'qs';
import { request, filterParam } from '../../utils/request';
import * as url from '../../../config/url/mms/merchantMemberManagementForm';

export async function getStoresList(params) {
  const p = filterParam(params);
  return request(`${url.getStoresList}?${qs.stringify(p)}`);
}

export async function getMealData(params){
  const p = filterParam(params);
  return request(`${url.getMealData}?${qs.stringify(p)}`);
}