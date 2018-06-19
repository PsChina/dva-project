import config from '../../config.json';

const objectName = 'agtp';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/roles`;
export const queryOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/role`;
export const updateOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/role`;
export const updateList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/roles`;
export const updateStatus = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/role/roleStatus`;
export const addOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/role`;
export const deleteList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/role/deleteRole`;
export const queryRoleMenuInfo = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/role/menus`;
export const assignRoleMenu = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/role/assignRoleMenu`;