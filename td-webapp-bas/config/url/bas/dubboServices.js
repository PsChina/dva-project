import config from '../../config.json';

const objectName = 'jobTriggerInfo';
const objectNames = 'jobTriggerInfos';
const objectHost = 'http://210.22.153.30:58091';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${objectHost}/dubbo-admin/governance/getAllServices.do`;
export const addOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
export const deleteList = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}`;
export const updateListStatus = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}/status`;
export const updateOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
export const queryOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
export const updateList = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}`;
export const excute = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/excute`;
export const pause = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/pause`;
export const recovery = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/recovery`;
