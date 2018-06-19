import config from '../../config.json';

/**
 * 业务清分
 */
const objectName = 'business';

// query need check channel list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/clearings`;

// query need check channel list
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/clearing`;

// export const batchOutAmt = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/batchOutAmt`;
