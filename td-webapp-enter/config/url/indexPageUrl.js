import config from '../config.json';

export const queryLoginInfoByToken = `${config.defaultHost}/${config.reqType}/${config.defaultApp}/loginInfo`;
