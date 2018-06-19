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
const queryWithdrawalAmount = 'stlWithdraw/queryAmount';
const withdraw = 'stlWithdraw/withdrawAmount';

// query need check channel list
export const queryList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${manageList}`;
// query need check channel one
export const queryOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${manageDetail}`;
// query need check channel one
export const qryStlDetail = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${stlDetail}`;

export const qryStlOrdDetail = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${stlOrdDetail}`;

export const stlApplyForMoney = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${applyForMoney}`;

export const qryBusinessOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${businessOne}`;

export const qryBusinessList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${businessList}`;

export const qryStlBusinessDetail = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${stlBusinessDetail}`;

export const qryTradeDetailList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${tradeDetailList}`;

// 查询商户可提现金额
export const qryAmount = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${queryWithdrawalAmount}`;

// 商户提现
export const applyWithdraw = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${withdraw}`;
