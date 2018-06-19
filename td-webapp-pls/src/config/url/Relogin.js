import config from '../config.json';
// ${config.loginUrl}
export const login = `${config.amsReqType}/${config.basApp}/user/login`;

export default {
  login,
};
