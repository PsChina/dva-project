import config from '../../config';

const objectName = 'merchant/router/bankcard';
const objectNames = 'merchant/routers/bankcard';
const objectNameDefault = 'merchant/router/bankcard/default';
// 基本变量命名标准化、减少代码修改量
// query all Bankcard mers except this modNo
export const queryModAllMersList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/mod/select`;

export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
export const queryOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
export const setDefualt = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNameDefault}`;
export const deleteOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;

// routers
export const queryAll = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/select`;

export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
export const addOneMod = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/mod`;
