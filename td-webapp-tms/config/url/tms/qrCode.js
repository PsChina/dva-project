import config from '../../config.json';

const objectName = 'termQrCode/qrcode';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;
export const queryOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const addNumbers = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;
export const updateListStatus = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/status`;
export const deleteList = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}s`;

export const updateOne = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}`;

export const queryAuthDetail = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/queryAuth`;
export const updateAuth = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/auth`;
export const queryAttach = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}/${objectName}/attach/select`;



