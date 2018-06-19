const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/agtp/agtp/users'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const list = [];
    for (let i = 0; i < 10; i++) {
      if (currentPage >= 3 && i > 1) {
        break;
      }
      list.push({
        usrId: `USR231187020121116672${i}`,
        agtId: `${currentPage}${i}`,
        usrName: `user${currentPage}-${i}`,
        usrRealName: `usrRealName${currentPage}-${i}`,
        usrEmail: `9122@22${currentPage}-${i}`,
        usrMobile: `1312222222${i}`,
        usrDesc: '该用户表现很出色',
        usrStatus: (i % 2 === 0 ? '0' : '1'),
        isLock: (i % 2 === 0 ? '0' : '1'),
        creTim: '2017-03-01 11：11：22',
      });
    }
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
  'GET /rest/agtp/agtp/role/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
  'POST /rest/agtp/agtp/user'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/agtp/agtp/users/Status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'PUT /rest/agtp/agtp/user/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/agtp/agtp/users'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },
  'GET /rest/agtp/user/usrRoles'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {'usrCurrRoleIdList': ['basDeveloper','basSuperAdministrator','bmsDeveloper','bmsSuperAdministrator','casDeveloper','casSuperAdministrator','cmsSuperAdministrator','mmsDeveloper','mmsSuperAdministrator','omsDeveloper','omsSuperAdministrator','pmsDeveloper','pmsSuperAdministrator','salesManager','tmsDeveloper','tmsSuperAdministrator','xxlJobSuperAdministrator'],'usrId':'USR2311870201211166720','allRoleList':[{'roleDesc':'权限系统-开发员','creTim':'20170417105000','creObj':'basDeveloper','sysId':'9000','isUse':'1','roleName':'权限系统-开发员','updObj':'basDeveloper','key':'basDeveloper','updTim':'20170417105000','roleId':'basDeveloper'},{'roleDesc':'权限系统超级管理员角色','creTim':'20170417105000','creObj':'authAdmin','sysId':'000','isUse':'1','roleName':'权限系统超级管理员','updObj':'authAdmin','key':'basSuperAdministrator','updTim':'20170417105000','roleId':'basSuperAdministrator'},{'roleDesc':'业务管理-开发员','creTim':'20170417105000','creObj':'bmsDeveloper','sysId':'9200','isUse':'1','roleName':'业务管理-开发员','updObj':'bmsDeveloper','key':'bmsDeveloper','updTim':'20170417105000','roleId':'bmsDeveloper'},{'roleDesc':'业务管理系统超级管理员角色','creTim':'20170417105000','creObj':'bmsAdmin','sysId':'200','isUse':'1','roleName':'业务管理系统超级管理员','updObj':'bmsAdmin','key':'bmsSuperAdministrator','updTim':'20170417105000','roleId':'bmsSuperAdministrator'},{'roleDesc':'账务系统-开发员','creTim':'20170417105000','creObj':'casDeveloper','sysId':'9001','isUse':'1','roleName':'账务系统-开发员','updObj':'casDeveloper','key':'casDeveloper','updTim':'20170417105000','roleId':'casDeveloper'},{'roleDesc':'账务系统超级管理员角色','creTim':'20170417105000','creObj':'casAdmin','sysId':'001','isUse':'1','roleName':'账务系统超级管理员','updObj':'casAdmin','key':'casSuperAdministrator','updTim':'20170417105000','roleId':'casSuperAdministrator'},{'roleDesc':'卡片管理系统超级管理员角色','creTim':'20170417105000','creObj':'cmsAdmin','sysId':'100','isUse':'1','roleName':'卡片管理系统超级管理员','updObj':'cmsAdmin','key':'cmsSuperAdministrator','updTim':'20170417105000','roleId':'cmsSuperAdministrator'},{'roleDesc':'会员管理-开发员','creTim':'20170417105000','creObj':'mmsDeveloper','sysId':'9101','isUse':'1','roleName':'会员管理-开发员','updObj':'mmsDeveloper','key':'mmsDeveloper','updTim':'20170417105000','roleId':'mmsDeveloper'},{'roleDesc':'会员管理系统超级管理员角色','creTim':'20170417105000','creObj':'mmsAdmin','sysId':'101','isUse':'1','roleName':'会员管理系统超级管理员','updObj':'mmsAdmin','key':'mmsSuperAdministrator','updTim':'20170417105000','roleId':'mmsSuperAdministrator'},{'roleDesc':'订单管理-开发员','creTim':'20170417105000','creObj':'omsDeveloper','sysId':'9104','isUse':'1','roleName':'订单管理-开发员','updObj':'omsDeveloper','key':'omsDeveloper','updTim':'20170417105000','roleId':'omsDeveloper'},{'roleDesc':'订单管理系统超级管理员角色','creTim':'20170417105000','creObj':'omsAdmin','sysId':'104','isUse':'1','roleName':'订单管理系统超级管理员','updObj':'omsAdmin','key':'omsSuperAdministrator','updTim':'20170417105000','roleId':'omsSuperAdministrator'},{'roleDesc':'通道管理-开发员','creTim':'20170417105000','creObj':'pmsDeveloper','sysId':'9103','isUse':'1','roleName':'通道管理-开发员','updObj':'pmsDeveloper','key':'pmsDeveloper','updTim':'20170417105000','roleId':'pmsDeveloper'},{'roleDesc':'通道管理系统超级管理员角色','creTim':'20170417105000','creObj':'pmsAdmin','sysId':'103','isUse':'1','roleName':'通道管理系统超级管理员','updObj':'pmsAdmin','key':'pmsSuperAdministrator','updTim':'20170417105000','roleId':'pmsSuperAdministrator'},{'roleDesc':'风控管理-开发员','creTim':'20170417105000','creObj':'rmsDeveloper','sysId':'9302','isUse':'1','roleName':'风控管理-开发员','updObj':'rmsDeveloper','key':'rmsDeveloper','updTim':'20170417105000','roleId':'rmsDeveloper'},{'roleDesc':'风控管理系统超级管理员角色','creTim':'20170417105000','creObj':'basAdmin','sysId':'302','isUse':'1','roleName':'风控管理超级管理员','updObj':'basAdmin','key':'rmsSuperAdministrator','updTim':'20170417105000','roleId':'rmsSuperAdministrator'},{'roleDesc':null,'creTim':'20170427155510','creObj':'authAdmin','sysId':'000','isUse':'1','roleName':'业务员','updObj':null,'key':'salesManager','updTim':null,'roleId':'salesManager'},{'roleDesc':'清算中心-开发员','creTim':'20170417105000','creObj':'smsDeveloper','sysId':'9301','isUse':'1','roleName':'清算中心-开发员','updObj':'smsDeveloper','key':'smsDeveloper','updTim':'20170417105000','roleId':'smsDeveloper'},{'roleDesc':'清算中心超级管理员角色','creTim':'20170417105000','creObj':'smsAdmin','sysId':'301','isUse':'1','roleName':'清算中心超级管理员','updObj':'smsAdmin','key':'smsSuperAdministrator','updTim':'20170417105000','roleId':'smsSuperAdministrator'},{'roleDesc':'终端管理-开发员','creTim':'20170417105000','creObj':'tmsDeveloper','sysId':'9102','isUse':'1','roleName':'终端管理-开发员','updObj':'tmsDeveloper','key':'tmsDeveloper','updTim':'20170417105000','roleId':'tmsDeveloper'},{'roleDesc':'终端管理系统超级管理员角色','creTim':'20170417105000','creObj':'tmsAdmin','sysId':'102','isUse':'1','roleName':'终端管理系统超级管理员','updObj':'tmsAdmin','key':'tmsSuperAdministrator','updTim':'20170417105000','roleId':'tmsSuperAdministrator'},{'roleDesc':'任务调度系统超级管理员角色','creTim':'20170417105000','creObj':'basAdmin','sysId':'500','isUse':'1','roleName':'任务调度系统超级管理员','updObj':'basAdmin','key':'xxlJobSuperAdministrator','updTim':'20170417105000','roleId':'xxlJobSuperAdministrator'}]},
    });
    res.json(data);
  },
  'GET /rest/agtp/user/assignUsrRole/USR2311870201211166720'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
};
