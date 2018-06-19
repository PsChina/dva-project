import config from '../../config.json';

/**
 * 结算划款
 */
const objectNames = 'stlConfirmOrder/doubts';
const objectName = 'stlConfirmOrder/doubt';

// query need check channel list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectNames}`;
// query need check channel one
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}`;

export const batchOutAmt = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/batchOutAmt`;
