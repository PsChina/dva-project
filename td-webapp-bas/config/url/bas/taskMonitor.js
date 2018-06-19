import config from '../../config.json';

const objectName = 'taskMonitor';
const objectNames = 'taskMonitors';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectNames}`;
export const queryOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}`;
