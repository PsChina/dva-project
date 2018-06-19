import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/stores`;
export const queryOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/store`;
export const updateOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/store`;
export const updateList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/stores`;
export const updateListStatus = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/stores/status`;
export const addOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/store`;
export const storeApply = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/storeApply`;
