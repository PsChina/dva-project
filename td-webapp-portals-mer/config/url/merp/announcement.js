import config from '../../config.json';

const objectName = 'announcement';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/list`;
export const queryPageList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/list/page`;
