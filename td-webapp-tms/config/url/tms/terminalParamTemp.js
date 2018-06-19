import config from '../../config.json';

const objectName = 'paramTemp';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const operateOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const querySelect = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s/select`;
