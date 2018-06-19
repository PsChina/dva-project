import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryTaskTodoList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/task/queryTaskTodoList`;
export const queryTaskMyApplyList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/task/queryTaskMyApplyList`;
export const queryTaskMyFinishList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/task/queryTaskMyFinishList`;
export const queryOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/task/queryDetail`;
export const updateAgree = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/task/updateAgree`;
export const updateReject = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/task/updateReject`;
export const queryAuditHis = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/task/queryAuditHis`;
