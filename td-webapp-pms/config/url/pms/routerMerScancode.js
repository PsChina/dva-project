import config from '../../config';

const objectName = 'merchant/router/scancode';
const objectNames = 'merchant/routers/scancode';
const objectNameDefault = 'merchant/router/scancode/default';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
export const queryOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}`;
export const setDefualt = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNameDefault}`;
export const deleteOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;

// routers
export const queryAlipayAll = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/alipay/mod/select`;
export const queryWechatAll = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/wechat/mod/select`;
export const queryGamapayAll = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/gamapay/mod/select`;
export const queryScancodeAll = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectNames}/select`;

export const addOne = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}`;
export const addOneMod = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}/${objectName}/mod`;

