import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agtp/users`;
export const queryOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agtp/user`;
export const updateOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agtp/user`;
export const updateList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agtp/users`;
export const updateStatus = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agtp/users/Status`;
export const addOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agtp/user`;
export const deleteList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/agtp/users`;
export const queryUsrRoleInfo = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/user/usrRoles`;
export const assignUsrRole = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/user/assignUsrRole`;
