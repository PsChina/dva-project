import config from '../../config';

const objectName = 'channel/merchant/bankcard';
const objectNames = 'channel/merchants/bankcard';
// 基本变量命名标准化、减少代码修改量
// validate primary key is repeat or not
export const checkChnMerNo = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/checkChnMerNo`;
// query merchant list
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// update merchant info
export const updateOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// add merchant info
export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// update transaction auth info
export const updateAuth = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/auth`;
// update merchant list status
export const updateListStatus = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/status`;
// delete disabled merchant list
export const deleteList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// merchant import
export const addBatchExcel = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/addExcel`;
// query select merchant
export const querySelect = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/select`;

