import config from '../../config.json';

const objectName = 'terminal';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}s`;
export const queryOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}`;
export const updateOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}`;
export const updateListStatus = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}s/status`;
export const queryAuthDetail = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/queryAuth`;
export const updateAuth = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/auth`;

