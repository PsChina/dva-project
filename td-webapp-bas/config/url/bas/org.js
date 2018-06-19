import config from '../../config.json';

const objectName = 'org';
// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/queryOrgTreeTable`;
export const addOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
export const updateOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}`;
export const deleteOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/deleteOne`;
export const queryOne = `${config.basHost}/${config.basReqType}/${config.basApp}/${objectName}/queryOne`;
