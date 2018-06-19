import config from '../../config.json';

const objectName = 'rule';
const objectNames = 'warnGroups';

export const queryList = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}/templets`;
export const ruleDetail = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}s`;
export const configMess = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/message`;
export const addOne = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}`;
export const updateState = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}/status`;
export const updateOne = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}`;
export const queryGroup = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectNames}`;
export const addWarnGroup = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/warn`;
export const queryMessages = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/message/templets`;









