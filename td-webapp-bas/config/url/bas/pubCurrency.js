import config from '../../config.json';

const objectName = 'pubCurrency';
const objectNames = 'pubCurrencys';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}`;
export const queryAll = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}/all`;

export const addOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
export const deleteList = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}`;
export const updateListStatus = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectNames}/status`;
export const updateOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
