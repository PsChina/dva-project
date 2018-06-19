import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体(menus)
export const queryMenus = `${config.basHost}/${config.basReqType}/${config.basApp}/user/systems`;
export const loginOut = `${config.basHost}/${config.basReqType}/${config.basApp}/user/logout`;
export const updatePsw = `${config.basHost}/${config.basReqType}/${config.basApp}/user/updatePsw`;
