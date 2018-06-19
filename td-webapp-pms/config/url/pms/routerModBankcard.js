import config from '../../config';

const objectName = 'router/mod';
const objectNames = 'router/mods';
const objectNameDefault = 'router/mod/default';
// const objectNameDefault = 'merchant/router/scancode/default';
// 基本变量命名标准化、减少代码修改量
//------------------ Mod
// query Mods list
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/bankcard`;
// check modNo not used
export const checkModNo = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/checkModNo`;
// add one Mod
export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// update one Mod
export const updateOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// delete one Mod
export const deleteOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;

//------------------ Mod`s Routers
// query one mod`s routers List
export const queryModRoutersList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// add one mod`s router Mer
export const addOneMer = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/mer`;
// delete one mod`s router Mer
export const deleteOneMer = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/mer`;
// update one mod`s router Mer Default
export const setDefualt = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNameDefault}`;

// export const queryOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;

// export const queryAll = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/select`;

