import config from '../../config.json';

/**
 * 平台清分
 */
const objectNames = 'clearPlatform/doubts';
const objectName = 'clearPlatform/doubt';

// query need check channel list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectNames}`;
// query need check channel one
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}`;

// query need check channel one
export const queryTransactonList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/queryTransactonList`;
