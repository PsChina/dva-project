import config from '../../config.json';

const objectName = 'store';

// 基本变量命名标准化、减少代码修改量
export const queryTaskTodoList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/task/queryTaskTodoList`;
export const queryTaskMyApplyList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/task/queryTaskMyApplyList`;
export const queryTaskMyFinishList = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/task/queryTaskMyFinishList`;
export const queryOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/task/queryDetail`;
export const updateAgree = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/task/updateAgree`;
export const updateReject = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/task/updateReject`;
export const queryAuditHis = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/task/queryAuditHis`;
export const queryTaskOne = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/${objectName}/task/queryTaskDetail`;
