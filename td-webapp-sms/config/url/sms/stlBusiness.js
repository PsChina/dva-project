import config from '../../config.json';

const businessDetail = 'business/settle';
const businessList = 'business/settles';
const stlDetail = 'business/clearings';


// query need check channel list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${businessList}`;
// query need check channel one
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${businessDetail}`;

export const qryStlDetail = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${stlDetail}`;

