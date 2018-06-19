import config from '../../config.json';

const objectName = 'jobTriggerLog';
const objectNames = 'jobTriggerLogs';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}`;
export const queryOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
