import config from '../../config.json';

/**
 * 划款记录
 */
const objectName = 'settles';

// query need check channel list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/orders`;
// query need check channel one
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/order`;

export const batchOutAmt = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/order/batch/remittances`;

export const outAmt = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/order/remittance`;

