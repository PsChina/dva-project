import config from '../../config.json';

const objectName = 'terminal/log';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const queryOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const queryListByTerId = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s/queryListByTerId`;
