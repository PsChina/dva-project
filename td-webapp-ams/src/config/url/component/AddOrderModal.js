import config from '../../config.json';

export const getPackageList = `${config.amsReqType}/${config.amsApp}/package/pack`;

export const getBankList = `${config.amsReqType}/${config.basApp}/pubBanks`;

export const uploadLogo = `${config.amsReqType}/${config.amsApp}/common/upload`;

export const getLogoBase64 = `${config.amsReqType}/${config.amsApp}/common/attach/select`;

export const getPartnerList = `${config.amsReqType}/${config.mmsApp}/agents`;
