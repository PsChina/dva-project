import config from '../../config.json';

const objectName = 'order/summaryOrder';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.omsHost}/${config.omsReqType}/${config.omsApp}/${objectName}s`;
export const exportList = `${config.omsHost}/${config.omsReqType}/${config.omsApp}/${objectName}s/export`;
