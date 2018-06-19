import config from '../../config.json';

export const packageList = `${config.amsReqType}/${config.amsApp}/package/pack`;

export const getStoresList = `${config.mmsReqType}/${config.mmsApp}/stores`;

export const getExtraPackageList = `${config.amsReqType}/${config.amsApp}/package/extra`;

export const getMerchantList = `${config.mmsReqType}/${config.mmsApp}/merchants`;