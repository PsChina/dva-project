import config from '../../config.json';

const objectName = 'terminal/mer';
const objectNames = 'terminal/mers';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectNames}`;
export const queryTermList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/terms`;
export const queryUnBindTermList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/bind`;
export const queryOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/term`;
export const updateOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const updateList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectNames}`;
export const unBindBatch = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/unbind`;
export const addOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const addBatch = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/add`;
