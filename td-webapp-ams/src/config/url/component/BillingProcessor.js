import config from '../../config.json';

export const orderList = `${config.amsReqType}/${config.amsApp}/order`;
export const confirmOrder = `${config.amsReqType}/${config.amsApp}/order/confirm/`;
export const confirmOrders = `${config.amsReqType}/${config.amsApp}/order/batchconfirm/`;
export const putOrder = `${config.amsReqType}/${config.amsApp}/order`;