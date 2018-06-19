import config from '../../config';

const objectName = 'channel/terminal/bankcard';
const objectNames = 'channel/terminals/bankcard';
// 基本变量命名标准化、减少代码修改量
// add terminals
export const addList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// query terminal info list
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// update terminal list status
export const updateListStatus = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/status`;
// update terminal key info
export const updateKey = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/key`;
// delete disabled terminal key list
export const deleteList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;

