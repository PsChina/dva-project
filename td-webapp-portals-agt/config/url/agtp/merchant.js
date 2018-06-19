import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/merchants`;
export const queryOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/merchant`;
export const updateBase = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/merchant`;
export const updateAcc = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/merchant`;
export const updateList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/merchants`;
export const addOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/merchant`;
export const updateListStatus = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/merchants/status`;
export const merchantApply = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/merchantApply`;
