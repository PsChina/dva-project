import config from '../../config.json';

/**
 * 分润审核管理
 */
const objectName = 'stlshr';

// query need check channel list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/verifys`;
// query need check channel one
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/verify`;

export const queryTransactonList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/verifys/transactions`;

export const verifySubmit = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/verify/submit`;
