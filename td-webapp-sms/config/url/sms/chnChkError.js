import config from '../../config.json';

const objectName = 'channel/error';
const objectNames = 'channel/errors';

// query reconciliation result list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectNames}`;
// query doubt detail
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}`;
// deal error
export const dealError = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/deal`;
