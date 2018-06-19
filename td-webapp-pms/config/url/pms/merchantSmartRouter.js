import config from '../../config';

const objectNames = 'merchants/smartRouter';
const objectName = 'merchant/smartRouter';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
export const queryOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
export const deleteList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
export const updateListStatus = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/status`;
