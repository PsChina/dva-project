import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryOne = `${config.bmsHost}/${config.bmsReqType}/${config.bmsApp}/merchant`;
export const addOne = `${config.bmsHost}/${config.bmsReqType}/${config.bmsApp}/merchant`;
export const updateOne = `${config.bmsHost}/${config.bmsReqType}/${config.bmsApp}/merchant`;
