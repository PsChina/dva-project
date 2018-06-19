import config from '../../config.json';

const objectName = 'terminal/key';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const verifyPassword = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/verifyPassword`;
export const exportList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s/export`;
