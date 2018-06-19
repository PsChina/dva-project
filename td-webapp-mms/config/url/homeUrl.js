import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryExpOrdInfo = `${config.mmsHost}/${config.mmsApp}/${config.mmsReqType}/expOrd`;
export const queryFaultTerInfo = `${config.mmsHost}/${config.mmsApp}/${config.mmsReqType}/terFault`;
export const queryLackTerInfo = `${config.mmsHost}/${config.mmsApp}/${config.mmsReqType}/terLack`;
