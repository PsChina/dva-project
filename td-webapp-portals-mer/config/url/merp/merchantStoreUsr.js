import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store/users`;
export const queryBras = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store/names`;
export const queryOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store/user`;
export const updateOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store/user`;
export const updateList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store/users`;
export const updateStatus = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store/users/Status`;
export const addOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store/user`;
export const deleteList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/store/users`;
