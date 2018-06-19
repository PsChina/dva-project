import config from '../../config.json';

const objectName = 'terminal/stock';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const queryOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const updateOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const updateList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const deleteList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const addOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const addBatch = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s/add`;
export const addBatchExcel = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s/addExcel`;
export const stocksOut = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s/out`;
export const recoveryList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s/recovery`;
export const selectParMod = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/selectParMod`;
