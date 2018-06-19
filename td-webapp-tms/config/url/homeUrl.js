import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryExpOrdInfo = `${config.tmsHost}/${config.tmsApp}/${config.tmsReqType}/expOrd`;
export const queryFaultTerInfo = `${config.tmsHost}/${config.tmsApp}/${config.tmsReqType}/terFault`;
export const queryLackTerInfo = `${config.tmsHost}/${config.tmsApp}/${config.tmsReqType}/terLack`;
