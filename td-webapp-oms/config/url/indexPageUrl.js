import config from '../config.json';

export const querySysMenu = `${config.basHost}/${config.basReqType}/${config.basApp}/user/menus`;
export const userLogin = `${config.basHost}/${config.basReqType}/${config.basApp}/user/login`;
export const userReLogin = `${config.basHost}/${config.basReqType}/${config.basApp}/user/relogin`;
// export const userLogin = `${config.authHost}/${config.authApp}/${config.authRequestType}/login.do`;
export const userLogout = `${config.basHost}/${config.basReqType}/${config.basApp}/logout.do`;



