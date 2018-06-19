import config from '../../config';

const objectName = 'mer';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}s`;
