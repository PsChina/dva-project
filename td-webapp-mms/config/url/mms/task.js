import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryTaskTodoList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/queryTaskTodoList`;
export const queryTaskMyApplyList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/queryTaskMyApplyList`;
export const queryTaskMyFinishList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/queryTaskMyFinishList`;
export const queryOne = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/task/queryDetail`;
export const updateAgree = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/task/updateAgree`;
export const updateReject = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/task/updateReject`;
export const queryAuditHis = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/task/queryAuditHis`;
