import config from '../../config';

const objectName = 'channel/transfer';
const objectNames = 'channels/transfer';
const objectNameDefault = 'channel/transfer/default';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
export const queryOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
export const updateOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
export const deleteList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
export const querySelect = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/select`;
export const queryBankList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/bank`;
// enable or disable
export const updateList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/status`;

export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
export const setDefualt = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNameDefault}`;

export const updateBank = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/bank`;