import config from '../../config.json';

const objectName = 'terminal/mer';
const objectNames = 'terminal/mers';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/stores`;
export const queryTermList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/terms`;
export const queryUnBindTermList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/bind`;
export const queryOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/term`;
export const updateOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}`;
export const updateList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectNames}`;
export const unBindBatch = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/unbind`;
export const addOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}`;
export const addBatch = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/add`;
