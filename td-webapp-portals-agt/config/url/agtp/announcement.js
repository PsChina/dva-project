import config from '../../config.json';

const objectName = 'announcement';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/list`;
export const queryPageList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/list/page`;
