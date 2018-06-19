import config from '../config.json';

export const querySysMenu = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/user/menus`;
//export const userReLogin = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/user/relogin`;
// export const userLogin = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/login.do`;
export const userLogout = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/user/logout`;



