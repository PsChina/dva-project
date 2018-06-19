import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
// url of get home graphic data
export const queryCheckCount = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/count/check`;
export const querySettleCount = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/count/settle`;
export const queryShareCount = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/count/share`;

