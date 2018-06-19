import config from '../../config.json';

const objectName = 'position';
const objectNames = 'positions';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectNames}`;
export const addOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}`;
export const updateListStatus = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectNames}/status`;
export const updateOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}`;
export const deleteOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}/deleteOne`;
export const queryPositionRole = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}/queryPositionRole`;
export const addPositionRole = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}/addPositionRole`;

