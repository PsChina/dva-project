import config from '../config.json';

export const getPackageList = `${config.amsReqType}/${config.amsApp}/package/pack`;
export const queryTypeList = `${config.amsReqType}/${config.amsApp}/package/industry`;
export const queryLevelList = `${config.amsReqType}/${config.amsApp}/package/level`;
export const getFavourableActivity = `${config.amsReqType}/${config.amsApp}/package/promotion`;
export const addPackage = `${config.amsReqType}/${config.amsApp}/package/pack`;
export const deletePackage = `${config.amsReqType}/${config.amsApp}/package/pack`;
export const enablePackage = `${config.amsReqType}/${config.amsApp}/package/pack/enable`;
export const disablePackage = `${config.amsReqType}/${config.amsApp}/package/pack/disable`;
export const onlinePackage = `${config.amsReqType}/${config.amsApp}/package/pack/online`;
export const offlinePackage = `${config.amsReqType}/${config.amsApp}/package/pack/offline`;
export const uploadLogo = `${config.amsReqType}/${config.amsApp}/common/upload`;
export const getSmartPOSList = `${config.amsReqType}/${config.tmsApp}/terminal/models`;
export const getCajasList = `${config.amsReqType}/${config.tmsApp}/terminal/models`;
export const getLogoBase64 = `${config.amsReqType}/${config.amsApp}/common/attach/select`;

export default {
  getPackageList,
  queryTypeList,
  queryLevelList,
  getFavourableActivity,
  addPackage,
  deletePackage,
  enablePackage,
  disablePackage,
  onlinePackage,
  offlinePackage,
  uploadLogo,
  getSmartPOSList,
  getCajasList,
  getLogoBase64,
};
