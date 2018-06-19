import config from '../../config.json';

/**
 * 分润管理
 */
const objectName = 'stlshr';

// query need check channel list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/stlshrs`;
// query need check channel one
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/stlshr`;

export const queryBusinessOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/stlbusineshr`;

export const queryTransactonList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/stlshrs/transactions`;

export const apply = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/stlshr/apply`;
