import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agents`;
export const queryOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agt`;
export const updateBase = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agt`;
export const updateAcc = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agt`;
export const updateList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agts`;
export const addOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agt`;
export const updateListStatus = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agts/status`;
export const agtApply = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agtApply`;
export const agtLogo = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agtLogo`;
