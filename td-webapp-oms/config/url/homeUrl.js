import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryExpOrdInfo = `${config.omsHost}/${config.omsApp}/${config.omsReqType}/expOrd`;
export const queryFaultTerInfo = `${config.omsHost}/${config.omsApp}/${config.omsReqType}/terFault`;
export const queryLackTerInfo = `${config.omsHost}/${config.omsApp}/${config.omsReqType}/terLack`;
