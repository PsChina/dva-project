import config from '../config';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryExpOrdInfo = `${config.pmsHost}/${config.pmsApp}/${config.pmsReqType}/expOrd`;
export const queryFaultTerInfo = `${config.pmsHost}/${config.pmsApp}/${config.pmsReqType}/terFault`;
export const queryLackTerInfo = `${config.pmsHost}/${config.pmsApp}/${config.pmsReqType}/terLack`;
