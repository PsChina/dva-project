import config from '../../config.json';

// 基本变量命名标准化、减少代码修改量
export const queryList = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/findModelMainByPage`;
export const addOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/addModelMain`;
export const updateListStatus = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/batchEnableModelMain`;
export const updateOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/updateModelMain`;
export const deleteOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/deleteModelMainByNo`;
export const queryOne = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/findProcessCfg`;
export const buildModelPathPre = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/buildModelPathPre`;
export const buildModelPath = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/buildModelPath`;
export const disableModelMain = `${config.wfHost}/${config.wfReqType}/${config.wfApp}/disableModelMain`;

