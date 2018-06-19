import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchants`;
export const queryOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchant`;
export const updateBase = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchant`;
export const updateAcc = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchant`;
export const updateList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchants`;
export const addOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchant`;
export const updateListStatus = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchants/status`;
export const merchantApply = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchantApply`;
export const updatePwd = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchant/password`;
export const getMerInf = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/merchant/info`;
