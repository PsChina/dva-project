import config from '../../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
const objectName = 'warnGroup';

export const queryWarnGroupList = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}s`;
export const deleteWarnGroups = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}`;
export const updateWarnGroup = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}`;
export const addWarnGroup = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}`;
export const updateWarnGroups = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}`;
