import config from '../config.json';

// url规范 主机/项目(dva)/类型(rest or mock)/实体
export const queryProductList = `${config.defaultHost}/${config.reqType}/${config.defaultApp}/products`;
export const deleteProducts = `${config.defaultHost}/${config.reqType}/${config.defaultApp}/products`;
export const updateProduct = `${config.defaultHost}/${config.reqType}/${config.defaultApp}/product`;
export const addProduct = `${config.defaultHost}/${config.reqType}/${config.defaultApp}/product`;
export const updateProducts = `${config.defaultHost}/${config.reqType}/${config.defaultApp}/products`;
// export const updateProducts = 'http://192.168.0.235:8080/tombot-web/tb/risk/rest/ruleTemp';
