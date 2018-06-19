import config from '../../config';

const objectName = 'channel/merchant/transfer';
const objectNames = 'channel/merchants/transfer';
// 基本变量命名标准化、减少代码修改量
// query merchant list
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// update merchant info
export const updateOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// delete disabled merchants
export const deleteList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// add merchant
export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// enable or disable
export const updateList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/status`;
// merchant import
export const addBatchExcel = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/addExcel`;
