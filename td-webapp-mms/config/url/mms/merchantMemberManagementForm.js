import config from '../../../config/config.json';

export const getMealData = `${config.amsReqType}/${config.amsApp}/package/store/openlist`;
export const getStoresList = `${config.mmsReqType}/${config.mmsApp}/stores`;
