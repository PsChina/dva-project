import config from '../../config';

const objectName = 'channel/bankcard';
const objectNames = 'channels/bankcard';
// 基本变量命名标准化、减少代码修改量
// add channel info
export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// validate channel is repeat or not
export const checkChnName = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/checkChnName`;
// update channel list status
export const updateListStatus = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/status`;
// update transaction auth info
export const updateAuth = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/auth`;
// query channel list
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// udpate channel info
export const updateOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
// delete disabled channel list
export const deleteList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
// query channel select list
export const querySelect = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/select`;

