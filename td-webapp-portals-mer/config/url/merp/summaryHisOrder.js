import config from '../../config.json';

const objectName = 'orders/summary/his';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}`;
export const exportList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/export`;
