import config from '../../config.json';

/**
 * 页面初始化时查询总行联行号
 * xuxf 2017-03-20
 */
export const queryBanklist = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/common/banks/select`;
/**
 * 页面初始化时查询支行联行号
 * xuxf 2017-03-20
 */
export const querySubBanklist = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/common/subBanks/select`;
/**
 * 页面初始化时获取到业务员信息
 * xuxf 2017-03-21
 */
export const queryBizSaleList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/common/bizSales/select`;
/**
 * 页面初始化时获取代理商用户角色所属系统信息
 * xuxf 2017-03-27
 */
export const querySysList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/common/sysInfo/select`;

/**
 * 上传附件
 * xuxf 2017-04-11
 */
export const upload = `${config.mmsHost}/attachment/commonFileUpload`;

/**
 * 查询附件详情
 * xuxf 2017-04-13
 */
export const queryAttach = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/common/attach/select`;


/**
 * 查询地区列表
 * xuxf 2017-04-13
 */
export const queryPubAreaList = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}/common/pubArea/select`;
