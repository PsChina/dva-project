import config from '../../config.json';

/**
 * 渠道清分
 */
const objectChannelName = 'channel';

// query need check channel list
export const queryChannelList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectChannelName}/clearings`;

// query need check channel list
export const queryChannelOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectChannelName}/clearing`;

// query need check channel list
export const queryChannelTransactonList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectChannelName}/clearings/transaction`;

/**
 * 平台清分
 */
const objectPlatformName = 'platform';

// query need check channel list
export const queryPlatformList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectPlatformName}/clearings`;
// query need check channel one
export const queryPlatformOne = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectPlatformName}/clearing`;
// query need check channel one
export const queryPlatformTransactonList = `${config.smsHost}/${config.smsReqType}/${config.smsApp}/${objectPlatformName}/clearings/transaction`;
