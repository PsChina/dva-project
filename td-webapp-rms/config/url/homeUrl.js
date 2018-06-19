import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryExpOrdInfo = `${config.basHost}/${config.basApp}/${config.basReqType}/expOrd`;
export const queryFaultTerInfo = `${config.basHost}/${config.basApp}/${config.basReqType}/terFault`;
export const queryLackTerInfo = `${config.basHost}/${config.basApp}/${config.basReqType}/terLack`;
