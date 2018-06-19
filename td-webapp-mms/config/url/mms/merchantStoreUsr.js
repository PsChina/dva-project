import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchantStore/users`;
export const queryOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchantStore/user`;
export const updateOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchantStore/user`;
export const updateList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchantStore/users`;
export const updateStatus = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchantStore/users/Status`;
export const addOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchantStore/user`;
export const deleteList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/merchantStore/users`;
