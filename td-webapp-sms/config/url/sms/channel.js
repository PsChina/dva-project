import config from '../../config.json';

const objectNames = 'channels';

// query need check channel list
export const querySelect = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectNames}/select`;
