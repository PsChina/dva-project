import config from '../../config.json';

const manageDetail = 'manage/settle';
const manageList = 'manage/settles';
const stlDetail = 'manage/stldetail';
const stlOrdDetail = 'manage/orderdetail';
const applyForMoney = 'manage/settleapply';
const stlBusinessDetail = 'manage/clearings';
const businessOne = 'business/settle';
const businessList = 'business/settles';
const tradeDetailList = 'manage/tradedetail';


// query need check channel list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${manageList}`;
// query need check channel one
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${manageDetail}`;
// query need check channel one
export const qryStlDetail = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${stlDetail}`;

export const qryStlOrdDetail = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${stlOrdDetail}`;

export const stlApplyForMoney = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${applyForMoney}`;

export const qryBusinessOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${businessOne}`;

export const qryBusinessList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${businessList}`;

export const qryStlBusinessDetail = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${stlBusinessDetail}`;

export const qryTradeDetailList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${tradeDetailList}`;
