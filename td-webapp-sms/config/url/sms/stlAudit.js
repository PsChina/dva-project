import config from '../../config.json';

const auditList = 'audit/settles';
const auditDetail = 'audit/settle';
const transferAuditPath = 'audit/settleaudit';


// query  list
export const queryList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${auditList}`;
// query  one detail
export const queryOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${auditDetail}`;
// 划款审核(结算审核)
export const transferAudit = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${transferAuditPath}`;



