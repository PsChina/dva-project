import config from '../../config.json';

/**
 * 渠道清分
 */
const objectNames = 'clearChannel/doubts';
const objectName = 'clearChannel/doubt';

// query need check channel list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectNames}`;

// query need check channel list
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}`;

export const queryTransactonList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/queryTransactonList`;
