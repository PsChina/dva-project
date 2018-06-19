import config from '../../config.json';

const objectName = 'terminal/firmware';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const queryOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const updateOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const updateList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const deleteList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
// export const updateListStatus = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/stats`;
export const addOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const upload = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/upload`;
export const querySelect = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s/select`;
export const querySelectByCop = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s/selectByCop`;
