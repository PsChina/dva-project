import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryExpOrdInfo = `${config.agtpHost}/${config.agtpApp}/${config.agtpReqType}/expOrd`;
export const queryFaultTerInfo = `${config.agtpHost}/${config.agtpApp}/${config.agtpReqType}/terFault`;
export const queryLackTerInfo = `${config.agtpHost}/${config.agtpApp}/${config.agtpReqType}/terLack`;
