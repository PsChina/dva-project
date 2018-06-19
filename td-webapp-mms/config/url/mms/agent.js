import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/agents`;
export const queryOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/agent`;
export const updateBase = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/agent`;
export const updateAcc = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/agent`;
export const updateList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/agents`;
export const addOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/agent`;
export const updateListStatus = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/agents/status`;
export const agtApply = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/agtApply`;
