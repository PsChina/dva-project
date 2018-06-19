import config from '../../config.json';

const objName = 'order/bankCard';
const objectName = 'orders/bankCard';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}`;
export const queryOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objName}`;
// export const updateListStatus = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/stats`;
// export const transferOrder = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/transferOrder`;
