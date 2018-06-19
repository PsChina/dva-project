import config from '../../config.json';

const objectName = 'warn/staff';
const objectNames = 'warn/staffs';
// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryWarnUserList = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectNames}`;
export const deleteWarnUsers = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectNames}/delete`;
export const updateWarnUser = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}`;
export const addWarnUser = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/${objectName}`;
export const updateWarnUsers = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/warnUser`;
export const WarnGroup = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/warnGroups`;
export const configWarnGroup = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/userGroup`;
export const updateWarnGroup = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/userGroup`;
export const queryOrgList = `${config.rmsHost}/${config.rmsReqType}/${config.rmsApp}/orgs`;


// export const updateProducts = 'http://192.168.0.235:8080/tombot-web/risk/rest/ruleTemp';
