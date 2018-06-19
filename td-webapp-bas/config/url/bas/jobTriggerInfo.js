import config from '../../config.json';

const objectName = 'jobinfo';
// 基本变量命名标准化、减少代码修改量
// export const queryList = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}/${objectName}/pageList`;
// export const addOne = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}/${objectName}/add`;
// export const deleteList = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}/${objectName}/remove`;
// export const updateOne = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}/${objectName}/reschedule`;
// export const queryOne = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}/${objectName}`;
// export const excute = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}/${objectName}/trigger`;
// export const pause = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}/${objectName}/pause`;
// export const recovery = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}/${objectName}/resume`;
export const queryList = `${config.xxlJobProxy}/${config.xxlJobProxyApp}/${objectName}/pageList`;
export const addOne = `${config.xxlJobProxy}/${config.xxlJobProxyApp}/${objectName}/add`;
export const deleteList = `${config.xxlJobProxy}/${config.xxlJobProxyApp}/${objectName}/remove`;
export const updateOne = `${config.xxlJobProxy}/${config.xxlJobProxyApp}/${objectName}/reschedule`;
export const queryOne = `${config.xxlJobProxy}/${config.xxlJobProxyApp}/${objectName}`;
export const excute = `${config.xxlJobProxy}/${config.xxlJobProxyApp}/${objectName}/trigger`;
export const pause = `${config.xxlJobProxy}/${config.xxlJobProxyApp}/${objectName}/pause`;
export const recovery = `${config.xxlJobProxy}/${config.xxlJobProxyApp}/${objectName}/resume`;
