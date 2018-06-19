
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pub_attachment
-- ----------------------------
DROP TABLE IF EXISTS `pub_attachment`;
CREATE TABLE `pub_attachment` (
  `ID` varchar(25) NOT NULL COMMENT '附件ID',
  `MODULENAME` varchar(10) DEFAULT NULL COMMENT '模块名称',
  `TABLENAME` varchar(40) DEFAULT NULL COMMENT '表名 用来指定改附件属于哪张表',
  `PKID` varchar(25) DEFAULT NULL COMMENT '业务表ID',
  `LX` varchar(10) DEFAULT NULL COMMENT '类型',
  `ORDERNUM` varchar(10) DEFAULT NULL COMMENT '序号',
  `FJNAME` varchar(60) DEFAULT NULL COMMENT '附件名称',
  `FJPATH` varchar(255) DEFAULT NULL COMMENT '附件路径',
  `FJO` varchar(20) DEFAULT NULL COMMENT '附件创建者',
  `FJT` varchar(14) DEFAULT NULL COMMENT '附件创建时间',
  `SFSX` char(1) DEFAULT '0' COMMENT '是否生效',
  `DX` varchar(12) DEFAULT '0' COMMENT '大小',
  `DPI` varchar(50) DEFAULT NULL COMMENT '分辨率',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='附件记录表';

-- ----------------------------
-- Table structure for pub_constant_code
-- ----------------------------
DROP TABLE IF EXISTS `pub_constant_code`;
CREATE TABLE `pub_constant_code` (
  `ID` varchar(20) NOT NULL COMMENT '主键(TD+18位数字)',
  `SYS_ID` varchar(3) DEFAULT '010' COMMENT '系统码，产品线编码；010-互联网支付产品 011-收单产品 012-预付卡产品 013-手刷产品',
  `CONSTANT_CODE` varchar(15) NOT NULL COMMENT '常量编码(常量码、错误码)',
  `CONSTANT_MSG_ZH` varchar(100) DEFAULT '' COMMENT '常量信息(中文：错误信息、常量信息)',
  `CONSTANT_MSG_EN` varchar(200) DEFAULT '' COMMENT 'CONSTANT MSG(EN：ERROR MSG、CONSTANT MSG)',
  `REMARK` varchar(200) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='常量码字典表';

-- ----------------------------
-- Table structure for pub_dict
-- ----------------------------
DROP TABLE IF EXISTS `pub_dict`;
CREATE TABLE `pub_dict` (
  `DICT_ID` varchar(20) NOT NULL COMMENT 'ID',
  `PARENT_ID` varchar(20) DEFAULT NULL COMMENT '父级ID',
  `DICT_CODE` varchar(20) DEFAULT NULL COMMENT '参数编码',
  `DICT_VALUE` varchar(60) DEFAULT NULL COMMENT '字典值',
  `ABR` varchar(20) DEFAULT NULL COMMENT '描述',
  `DICT_NAME` varchar(100) DEFAULT NULL COMMENT '参数名称',
  `HLP` varchar(20) DEFAULT NULL COMMENT '快捷帮助【拼音】',
  `SEQ_NUM` varchar(5) DEFAULT NULL COMMENT '序号',
  `DICT_LEVEL` varchar(5) DEFAULT NULL COMMENT '级别 1级 2级',
  `STATUS` char(1) DEFAULT '1' COMMENT '状态 1启用 0禁用',
  PRIMARY KEY (`DICT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='终端服务码表';

-- ----------------------------
-- Table structure for pub_sensitive_key
-- ----------------------------
DROP TABLE IF EXISTS `pub_sensitive_key`;
CREATE TABLE `pub_sensitive_key` (
  `SYS_ID` char(3) NOT NULL DEFAULT '010' COMMENT '系统码',
  `SENSITIVE_KEY` varchar(40) DEFAULT NULL COMMENT '加密字段名',
  `KEY_REMARK` varchar(100) DEFAULT NULL COMMENT '字段说明'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='敏感字段表';

-- ----------------------------
-- Table structure for term_app_inf
-- ----------------------------
DROP TABLE IF EXISTS `term_app_inf`;
CREATE TABLE `term_app_inf` (
  `APP_ID` varchar(21) NOT NULL COMMENT 'ID',
  `APP_NAME` varchar(255) DEFAULT NULL COMMENT 'app 名称',
  `APP_PACKAGE` varchar(255) DEFAULT NULL COMMENT 'app package',
  `APP_VERSION` varchar(5) DEFAULT NULL COMMENT 'app 版本',
  `APP_PLATFORM` char(2) DEFAULT NULL COMMENT 'app平台   01: POS  02:ANDROID  03:IOS',
  `APP_AUTO_UPDATE` char(2) DEFAULT NULL COMMENT 'APP是否自动更新 01:是   02:强制更新  03 否',
  `APP_DESC` varchar(500) DEFAULT NULL COMMENT 'APP 描述',
  `APP_ISSUE_DATE` varchar(14) DEFAULT NULL COMMENT 'APP发布时间',
  `APP_SZIE` varchar(10) DEFAULT NULL COMMENT 'APP 大小 (MB)',
  `APP_ICON` varchar(10) DEFAULT NULL COMMENT 'APP LOGO',
  `APP_FILE` varchar(20) DEFAULT NULL COMMENT '文件ID (附件表ID)',
  `APP_FILE_NAME` varchar(255) DEFAULT NULL COMMENT '文件名称',
  `APP_DESC_PIC1` varchar(255) DEFAULT NULL COMMENT '文件名称',
  `APP_DESC_PIC2` varchar(255) DEFAULT NULL COMMENT '文件名称',
  `APP_DESC_PIC3` varchar(255) DEFAULT NULL COMMENT '文件名称',
  `APP_DESC_PIC4` varchar(255) DEFAULT NULL COMMENT '文件名称',
  `CREATE_USER_ID` varchar(20) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`APP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for term_cop_inf
-- ----------------------------
DROP TABLE IF EXISTS `term_cop_inf`;
CREATE TABLE `term_cop_inf` (
  `COP_ID` char(21) NOT NULL COMMENT '厂商ID',
  `COP_NAM` varchar(50) DEFAULT NULL COMMENT '厂商名称',
  `COP_SH_NAM` varchar(20) DEFAULT NULL COMMENT '厂商简称',
  `COP_DESC` varchar(255) DEFAULT NULL COMMENT '厂商描述',
  `COP_CONTACTS` varchar(20) DEFAULT NULL COMMENT '厂商联系人',
  `COP_TEL` varchar(20) DEFAULT NULL COMMENT '厂商联系电话',
  `COP_ADDR` varchar(255) DEFAULT NULL COMMENT '厂商联系地址',
  PRIMARY KEY (`COP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='厂商信息表';

-- ----------------------------
-- Table structure for term_inf
-- ----------------------------
DROP TABLE IF EXISTS `term_inf`;
CREATE TABLE `term_inf` (
  `TER_ID` char(21) NOT NULL COMMENT '终端唯一序列号',
  `TER_NO` varchar(8) DEFAULT NULL COMMENT '终端号',
  `TER_AGT_ID` varchar(20) DEFAULT NULL COMMENT '代理商编号',
  `TER_MER_ID` varchar(20) DEFAULT NULL COMMENT '商户编号',
  `TER_BRA_ID` varchar(21) DEFAULT NULL COMMENT '门店编号',
  `TER_STATUE` char(1) NOT NULL COMMENT '状态(1:正常 0:停用',
  PRIMARY KEY (`TER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for term_key_inf
-- ----------------------------
DROP TABLE IF EXISTS `term_key_inf`;
CREATE TABLE `term_key_inf` (
  `TER_ID` char(21) NOT NULL COMMENT '终端唯一序列号',
  `LMKKEY` char(33) DEFAULT NULL COMMENT '主密钥(LMK)',
  `ZMKKEY` char(33) DEFAULT NULL COMMENT '主密钥(ZMK)',
  `TMK_CHK` char(16) DEFAULT NULL COMMENT '主密钥校验值',
  `LPINKEY` char(33) DEFAULT NULL COMMENT '终端PIN密钥',
  `LMACKEY` char(33) DEFAULT NULL COMMENT '终端MAC密钥',
  `LTDKEY` char(33) DEFAULT NULL COMMENT '终端TDK密钥',
  `ZMKKEY_UPDATE_TIME` char(14) DEFAULT NULL COMMENT '主键更新时间',
  `WK_KEY_UPDATE_TIME` char(14) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`TER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for term_list_inf
-- ----------------------------
DROP TABLE IF EXISTS `term_list_inf`;
CREATE TABLE `term_list_inf` (
  `BAT_NO` varchar(42) NOT NULL COMMENT '入库批次号 (只登记不关联)',
  `ADD_DAT` varchar(8) NOT NULL COMMENT '入库日期 (只登记不关联)',
  `FIL_PATH` varchar(200) DEFAULT NULL COMMENT '上传路径 (只登记不关联)',
  `FIL_NAM` varchar(60) DEFAULT NULL COMMENT '文件名 (只登记不关联)',
  `TER_SRC` varchar(1) NOT NULL COMMENT '机具来源 (只登记不关联)',
  `COP_NAM` varchar(30) DEFAULT NULL COMMENT '机具厂商 (只登记不关联)',
  `TER_MOD_NO` varchar(30) DEFAULT NULL COMMENT '终端型号 (只登记不关联)',
  `TER_VER` varchar(30) DEFAULT NULL COMMENT '终端程序版本 (只登记不关联)',
  `CRE_ID` varchar(15) DEFAULT NULL COMMENT '操作员 (只登记不关联)',
  `CRE_ORG` char(1) DEFAULT NULL COMMENT '1.运营商，2.代理商, 3.商户(只登记不关联)',
  `CRE_ORG_ID` varchar(21) DEFAULT NULL COMMENT '运营商，代理商, 商户(只登记不关联)',
  PRIMARY KEY (`BAT_NO`,`ADD_DAT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for term_mod_inf
-- ----------------------------
DROP TABLE IF EXISTS `term_mod_inf`;
CREATE TABLE `term_mod_inf` (
  `TER_MOD_ID` char(21) NOT NULL COMMENT '机具型号ID',
  `COP_ID` char(21) DEFAULT NULL COMMENT '厂商ID',
  `TER_MOD_NO` varchar(20) DEFAULT NULL COMMENT '机具型号',
  `TER_TYP` char(2) DEFAULT NULL COMMENT '终端类型 01:智能POS机 02:传统POS机 03:虚拟终端 04:手机POS 05:MPOS',
  `TER_SUB_TYP` char(2) DEFAULT NULL COMMENT '终端子类型 00:其他 01：拨号传统POS机 02：移动传统POS机 ''',
  `REMARK` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`TER_MOD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='机具型号信息表';

-- ----------------------------
-- Table structure for term_opt_inf
-- ----------------------------
DROP TABLE IF EXISTS `term_opt_inf`;
CREATE TABLE `term_opt_inf` (
  `OPT_LOGNO` char(21) NOT NULL COMMENT '操作日志流水号唯一标识',
  `TER_ID` char(21) NOT NULL COMMENT '终端唯一序列号(关联字段)',
  `OPT_TER_PHYNO` varchar(50) NOT NULL COMMENT '终端物理编号(只登记不关联)',
  `OPT_STEP` char(1) NOT NULL COMMENT '操作 步骤 (0 入库，1 出库，2 绑定，3 解绑商户，4 解绑代理商 5 回收 6 删除)',
  `OPT_DESC` varchar(600) NOT NULL COMMENT '操作描述(格式待定：1.html模版 2.描述模板 )',
  `OPT_ORG` char(1) NOT NULL COMMENT '操作机构 (0:运营商 1:代理商 2:商户)',
  `OPT_ORG_ID` char(21) DEFAULT NULL COMMENT '操作机构ID',
  `OPT_OBJ` varchar(21) DEFAULT NULL COMMENT '操作人',
  `OPT_DAT` varchar(14) DEFAULT NULL COMMENT '操作时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for term_pro_verison
-- ----------------------------
DROP TABLE IF EXISTS `term_pro_verison`;
CREATE TABLE `term_pro_verison` (
  `VER_ID` char(21) NOT NULL COMMENT '机具版本ID',
  `VER_NO` char(30) NOT NULL COMMENT '软件版本号:即版本名称',
  `COP_ID` char(21) DEFAULT NULL COMMENT '厂商ID',
  `VER_TYP` char(1) NOT NULL COMMENT '程序类型 1.traditional 2.android 3.ios',
  `VER_TIM` char(14) DEFAULT NULL COMMENT '发布时间',
  `VER_REMARK` char(100) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`VER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for term_pro_verison_sup
-- ----------------------------
DROP TABLE IF EXISTS `term_pro_verison_sup`;
CREATE TABLE `term_pro_verison_sup` (
  `VER_ID` char(21) NOT NULL COMMENT '机具版本ID',
  `TER_MOD_ID` char(21) NOT NULL COMMENT '机具型号ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for term_store_inf
-- ----------------------------
DROP TABLE IF EXISTS `term_store_inf`;
CREATE TABLE `term_store_inf` (
  `TER_ID` char(21) NOT NULL COMMENT '终端唯一序列号',
  `TER_PHYNO` varchar(50) NOT NULL COMMENT '终端物理编号',
  `TER_COP_ID` char(21) NOT NULL COMMENT '机具厂商',
  `TER_MOD_ID` char(21) NOT NULL COMMENT '机具型号',
  `TER_VER` varchar(30) DEFAULT NULL COMMENT '机具版本号',
  `ADD_DAT` varchar(14) NOT NULL COMMENT '入库时间',
  `ADD_BATNO` char(21) DEFAULT NULL COMMENT '入库批次号',
  `OUT_DAT` varchar(14) DEFAULT NULL COMMENT '出库时间',
  `STO_STATUS` char(1) DEFAULT NULL COMMENT '库存状态 0:入库 1:出库 2:回收',
  `STR_DAT` varchar(14) DEFAULT NULL COMMENT '质保生效日期',
  `END_DAT` varchar(14) DEFAULT NULL COMMENT '质保失效日期',
  `TER_SRC` varchar(1) DEFAULT NULL COMMENT '机具来源	1 厂商发货 2持机入网',
  `TER_USE_MOD` char(1) DEFAULT NULL COMMENT '终端使用模式 1 出售 2 租赁',
  `TER_ADD_MOD` char(1) NOT NULL COMMENT '终端入库模式 1 一般入库 2 预入库(生成密钥、终端号)',
  `TER_ADD_AMT` varchar(15) NOT NULL COMMENT '终端入库价',
  `TER_OUT_AMT` varchar(15) DEFAULT NULL COMMENT '终端出库价',
  `TER_NETIN_AMT` varchar(15) DEFAULT NULL COMMENT '终端入网价',
  `CURRENCY` varchar(15) DEFAULT NULL COMMENT '币种',
  `IN_OPR_ID` varchar(15) DEFAULT NULL COMMENT '入库操作员',
  `OUT_OPR_ID` varchar(15) DEFAULT NULL COMMENT '出库操作员',
  `TER_OWN` char(1) DEFAULT NULL COMMENT '设备归属	0 运营商 1 代理商 2 商户',
  PRIMARY KEY (`TER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for term_txnauth_inf
-- ----------------------------
DROP TABLE IF EXISTS `term_txnauth_inf`;
CREATE TABLE `term_txnauth_inf` (
  `TER_ID` char(21) NOT NULL COMMENT '终端唯一序列号',
  `SCAN_SUP` char(1) DEFAULT NULL COMMENT '1.支持 0.不支持 ',
  `BANK_CARD_SUP` char(1) NOT NULL COMMENT '1.支持 0.不支持 ',
  `PRE_CARD_SUP` char(1) DEFAULT NULL COMMENT '1.支持 0.不支持 ',
  `POSPAY_TXN_SUP` char(20) NOT NULL COMMENT '严格按照顺序：余额查询,消费,消费冲正,撤销,撤销冲正,退货,预授权,预授权冲正,预授权撤销,预授权撤销冲正,预授权完成,预授权完成冲正,预授权完成撤销,预授权完成撤销冲正,  一共15个域，每个域用二进制：1表示支持，0表示不支持 转为HEX',
  `SCANPAY_TXN_SUP` char(20) DEFAULT NULL COMMENT '扫码支付(付款),二维码扫码(收款),撤销,退货   一共4个域，每个域用二进制：1表示支持，0表示不支持 转为HEX',
  `PRE_TXN_SUP` char(20) DEFAULT NULL COMMENT '余额查询，消费，消费冲正，撤销，撤销冲正，退货，退货冲正  一共7个域，每个域用二进制：1表示支持，0表示不支持 转为HEX',
  PRIMARY KEY (`TER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
