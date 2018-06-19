import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/stores`;
export const queryOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store`;
export const updateOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store`;
export const updateList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/stores`;
export const updateListStatus = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/stores/status`;
export const addOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store`;
export const queryAttach = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store/attachments`;
