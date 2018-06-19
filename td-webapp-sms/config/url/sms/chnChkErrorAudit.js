import config from '../../config.json';

const objectName = 'channel/error/audit';
const objectNames = 'channel/error/audits';

// query error audit list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectNames}`;
// audit error deal
export const auditErrorDeal = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}`;
// query audit history list
export const queryAuditHis = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectName}`;
