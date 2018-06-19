import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryExpOrdInfo = `${config.bmsHost}/${config.bmsApp}/${config.bmsReqType}/expOrd`;
export const queryFaultTerInfo = `${config.bmsHost}/${config.bmsApp}/${config.bmsReqType}/terFault`;
export const queryLackTerInfo = `${config.bmsHost}/${config.bmsApp}/${config.bmsReqType}/terLack`;
