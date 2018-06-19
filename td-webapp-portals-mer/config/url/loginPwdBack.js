import config from '../config.json';

export const sendCode = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/vcode/send`;
export const validCode = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/vcode/valid`;
export const setPassword = `${config.merpHost}/${config.merpReqType}/${config.merpApp}/user/password`;
