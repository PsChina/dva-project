import config from '../../config.json';

const objectName = 'term';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}s`;
