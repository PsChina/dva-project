import config from '../../config.json';

const objectName = 'procedure';
const objectNames = 'procedures';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectNames}`;
export const addOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}`;
export const updateListStatus = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectNames}/status`;
export const updateOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}`;
export const deleteOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}/deleteOne`;
export const findDDLForAddNode = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/${objectName}/findDDLForAddNode`;

