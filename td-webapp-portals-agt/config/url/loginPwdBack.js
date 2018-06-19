import config from '../config.json';

export const sendCode = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/loginPwdBack/sendCode`;
export const validCode = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/loginPwdBack/validCode`;
export const updatePwd = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/loginPwdBack/updatePwd`;
