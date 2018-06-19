import config from '../../config.json';

const objectName = 'user';
const objectNames = 'agt';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}s`;

export const queryAgtList = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectNames}`;