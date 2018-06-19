import config from '../../config.json';

const objectName = 'channel/check';
const objectNames = 'channel/checks';

// query reconciliation result list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectNames}`;
// query success check list
export const querySuccessList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}/success`;
// query second summary list
export const querySecList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}`;


