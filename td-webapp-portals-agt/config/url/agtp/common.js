import config from '../../config.json';

/**
 * 页面初始化时查询总行联行号
 * xuxf 2017-03-20
 */
export const queryBanklist = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/common/banks/select`;
/**
 * 页面初始化时查询支行联行号
 * xuxf 2017-03-20
 */
export const querySubBanklist = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/common/subBanks/select`;
/**
 * 页面初始化时获取到业务员信息
 * xuxf 2017-03-21
 */
export const queryBizSaleList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/common/bizSales/select`;
/**
 * 页面初始化时获取代理商用户角色所属系统信息
 * xuxf 2017-03-27
 */
export const querySysList = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/common/sysInfo/select`;
/**
 * 页面初始化时获取行业列表数据
 * mohaijun 2018-06-01
 */
export const queryIndustryList = `${config.basHost}/${config.basReqType}/${config.basApp}/spgatewayBusinessType`;

/**
 * 上传附件
 * xuxf 2017-04-11
 */
export const upload = `${config.agtpHost}/attachment/commonFileUpload`;

/**
 * 查询附件详情
 * xuxf 2017-04-13
 */
export const queryAttach = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}/common/attach/select`;


