import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryHisCount = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/count/txn/his`;
export const queryTodayCount = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/count/txn/today`;
export const queryStoreCount = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/count/store/txn`;
export const queryTermCount = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/count/term/txn`;
export const querySettleCount = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/count/settle/amt`;
