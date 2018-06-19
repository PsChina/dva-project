import config from '../../config.json';

/**
 * 分润管理
 */
const objectName = 'stlshr';

// query need check channel list
export const queryList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/stlshrs`;
// query need check channel one
export const queryOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/stlshr`;

export const queryBusinessOne = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/stlbusineshr`;

export const queryTransactonList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/${objectName}/stlshrs/transactions`;
