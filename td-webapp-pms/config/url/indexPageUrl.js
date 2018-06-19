import config from '../config';

export const querySysMenu = `${config.basHost}/${config.basReqType}/${config.basApp}/user/menus`;
export const userReLogin = `${config.basHost}/${config.basReqType}/${config.basApp}/user/relogin`;
// export const userLogin = `${config.authHost}/${config.authApp}/${config.authtmsReqType}/login.do`;
export const userLogout = `${config.basHost}/${config.basReqType}/${config.basApp}/logout.do`;
