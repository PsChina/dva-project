import config from '../../config.json';

const objectName = 'user';
const objectNames = 'users';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}`;

export const addOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
export const deleteList = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}`;
export const updateListStatus = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}/status`;
export const updateOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
export const resetPwd = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/resetPwd`;
export const unLock = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/unLock`;
export const updatePwd = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/updatePwd`;
export const queryUsrRoleInfo = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/usrRoles`;
export const assignUsrRole = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/assignUsrRole`;

export const queryOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
export const updateList = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}`;

