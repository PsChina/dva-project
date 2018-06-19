import config from '../../config.json';

const objectName = 'channel/doubt';
const objectNames = 'channel/doubts';

// query reconciliation result list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectNames}`;
// query doubt detail
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}`;
