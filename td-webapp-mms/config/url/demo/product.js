import config from '../../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryProductList = `${config.defaultHost}/${config.requestType}/${config.mmsApp}/products`;
export const deleteProducts = `${config.defaultHost}/${config.requestType}/${config.mmsApp}/products`;
export const updateProduct = `${config.defaultHost}/${config.requestType}/${config.mmsApp}/product`;
export const addProduct = `${config.defaultHost}/${config.requestType}/${config.mmsApp}/product`;
export const updateProducts = `${config.defaultHost}/${config.requestType}/${config.mmsApp}/products`;
