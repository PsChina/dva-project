import config from '../../config.json';

const objectName = 'terminal';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}s`;
export const queryOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}`;
export const updateOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}`;
export const updateListStatus = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}s/status`;
export const queryAuthDetail = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/queryAuth`;
export const updateAuth = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/auth`;

