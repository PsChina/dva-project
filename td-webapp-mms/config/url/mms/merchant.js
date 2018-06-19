import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchants`;
export const checkBlackList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchant/checkBlackList`;
export const queryOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchant`;
export const updateBase = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchant`;
export const updateAcc = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchant`;
export const updateList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchants`;
export const addOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchant`;
export const updateListStatus = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchants/status`;
export const merchantApply = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchantApply`;
export const merchantGlobalApply = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchantGlobalApply`;
export const updateOther = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchant`;
export const openMeal = `${config.mmsReqType}/${config.amsApp}/package/store/open/`
