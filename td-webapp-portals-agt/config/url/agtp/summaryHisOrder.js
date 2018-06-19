import config from '../../config.json';

const objectName = 'order/summary/his';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}`;
export const exportList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/export`;
