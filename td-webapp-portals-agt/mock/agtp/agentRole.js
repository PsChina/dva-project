const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/agtp/agtp/roles'(req, res) {
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
        roleId: `casSuperAdministrator${i}`,
        roleName: `user${currentPage}-${i}`,
        roleDesc: `收单操业务作员${i}`,
        isUse: (i % 2 === 0 ? '0' : '1'),
        creTim: '2017-03-01 11：11：22',
        creObj: `王小明${i}`,
        updObj: `张小鹏${i}`,
        updTim: '2017-03-01 12:12:12',
        sysName: (i % 2 === 0 ? '011' : '010'),
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
  'POST /rest/agtp/agtp/role'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },
  'PUT /rest/agtp/agtp/roles/Status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'PUT /rest/agtp/agtp/role/10'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },
  'POST /rest/agtp/agtp/roles'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },
  'GET /rest/agtp/agtp/queryRoleMenuInfo'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    const total = 22;
    console.log('request param =>', param);
    const list = {"roleCurrMenuIdList":["001-01","001-01-01","001-01-02","001-02","001-02-01","001-02-02","001-02-03","001-02-04","001-02-05","001-02-06","001-03","001-03-01","001-03-03","001-04","001-04-01","001-05","001-05-01","001-05-02","001-05-03","001-05-04","001-06","001-06-01","001-06-02","001-07","001-07-01","001-08","001-08-01","001-08-01-01","001-08-01-02","001-08-01-03","001-08-01-04","001-08-01-05","001-08-01-06","001-08-02","001-08-02-01","001-08-02-02","001-08-02-03","001-08-02-04","001-08-02-05","001-08-02-06","001-08-02-07","001-08-02-08","001-08-02-09","001-08-02-10","001-08-02-11","001-08-02-12","001-08-03","001-08-03-01","001-08-03-02","001-08-03-03","001-08-03-04","001-08-03-05","001-08-03-06","001-08-03-07","001-08-03-08","001-08-03-09"],"menuTree":{"children":[{"menuId":"001","parentMenuId":"0","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"0","menuName":"账务服务","menuDesc":"账务服务","menuUrl":"#","menuStatus":"1","menuIcon":null,"creObjName":null,"creTim":null,"updObjName":null,"updTim":null,"children":[{"menuId":"001-01","parentMenuId":"001","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"科目管理","menuDesc":null,"menuUrl":"#","menuStatus":"1","menuIcon":"share-alt","creObjName":"gy","creTim":"20170508191610","updObjName":"gy","updTim":"20170508192039","children":[{"menuId":"001-01-01","parentMenuId":"001-01","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"业务类别维护","menuDesc":null,"menuUrl":"cas/subjectManage/busTypGroupManage","menuStatus":"1","menuIcon":"share-alt","creObjName":"gy","creTim":"20170508192026","updObjName":"zhang_dd","updTim":"20170509104549","children":null},{"menuId":"001-01-02","parentMenuId":"001-01","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"科目代码维护","menuDesc":"科目代码维护","menuUrl":"cas/subjectManage/subjectCodeManage","menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170510175843","updObjName":null,"updTim":null,"children":null}]},{"menuId":"001-02","parentMenuId":"001","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户管理","menuDesc":null,"menuUrl":"#","menuStatus":"1","menuIcon":"wallet","creObjName":"gy","creTim":"20170509163938","updObjName":null,"updTim":null,"children":[{"menuId":"001-02-01","parentMenuId":"001-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"客户信息管理","menuDesc":null,"menuUrl":"cas/accManage/cusInfManage","menuStatus":"1","menuIcon":"team","creObjName":"gy","creTim":"20170509164200","updObjName":"yangxm","updTim":"20170512094606","children":null},{"menuId":"001-02-02","parentMenuId":"001-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"子账户类别维护","menuDesc":null,"menuUrl":"cas/accManage/subAccCategoryManage","menuStatus":"1","menuIcon":"team","creObjName":"yangxm","creTim":"20170512094711","updObjName":"gy","updTim":"20170516195125","children":null},{"menuId":"001-02-03","parentMenuId":"001-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户维护","menuDesc":null,"menuUrl":"cas/accManage/accProfilesManage","menuStatus":"1","menuIcon":"team","creObjName":"yangxm","creTim":"20170512094818","updObjName":"gy","updTim":"20170516195130","children":null},{"menuId":"001-02-04","parentMenuId":"001-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户记账管理","menuDesc":null,"menuUrl":"cas/accManage/accManageInfManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170522140752","updObjName":"yangxm","updTim":"20170522153340","children":null},{"menuId":"001-02-05","parentMenuId":"001-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"记账方式维护","menuDesc":null,"menuUrl":"cas/accManage/accModeInfManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170522140839","updObjName":"yangxm","updTim":"20170522153354","children":null},{"menuId":"001-02-06","parentMenuId":"001-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"冻结维护","menuDesc":null,"menuUrl":"cas/accManage/accFrozDetailManage","menuStatus":"0","menuIcon":"user","creObjName":"yangxm","creTim":"20170527175011","updObjName":null,"updTim":null,"children":null}]},{"menuId":"001-03","parentMenuId":"001","menuLevel":null,"sysId":"001","menuType":null,"isLeaf":"1","menuName":"交易管理","menuDesc":null,"menuUrl":"#","menuStatus":"1","menuIcon":"bars","creObjName":"gy","creTim":"20170511114811","updObjName":null,"updTim":null,"children":[{"menuId":"001-03-01","parentMenuId":"001-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"基础交易管理","menuDesc":null,"menuUrl":"cas/transManage/transBaseManage","menuStatus":"1","menuIcon":"pay-circle","creObjName":"gy","creTim":"20170511134646","updObjName":"gy","updTim":"20170512141608","children":null},{"menuId":"001-03-03","parentMenuId":"001-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"分录规则管理","menuDesc":null,"menuUrl":"cas/transManage/accEntryRulesInfManage","menuStatus":"1","menuIcon":"book","creObjName":"gy","creTim":"20170511134938","updObjName":"gy","updTim":"20170512141622","children":null}]},{"menuId":"001-04","parentMenuId":"001","menuLevel":null,"sysId":"001","menuType":null,"isLeaf":"1","menuName":"冻结管理","menuDesc":null,"menuUrl":"#","menuStatus":"1","menuIcon":"api","creObjName":"gy","creTim":"20170511114922","updObjName":"gy","updTim":"20170531142342","children":[{"menuId":"001-04-01","parentMenuId":"001-04","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户冻结管理","menuDesc":null,"menuUrl":"cas/accFrozManage/accFrozDetailManage","menuStatus":"1","menuIcon":"api","creObjName":"gy","creTim":"20170531142316","updObjName":"gy","updTim":"20170531142333","children":null}]},{"menuId":"001-05","parentMenuId":"001","menuLevel":null,"sysId":"001","menuType":null,"isLeaf":"1","menuName":"流水查询","menuDesc":null,"menuUrl":"#","menuStatus":"1","menuIcon":"key","creObjName":"gy","creTim":"20170511115047","updObjName":"gy","updTim":"20170511115242","children":[{"menuId":"001-05-01","parentMenuId":"001-05","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账务流水查询","menuDesc":null,"menuUrl":"cas/casJnlQry/casTxnJnl","menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170531141839","updObjName":null,"updTim":null,"children":null},{"menuId":"001-05-02","parentMenuId":"001-05","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户流水查询","menuDesc":null,"menuUrl":"cas/casJnlQry/casBokAccJnl","menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170531141907","updObjName":null,"updTim":null,"children":null},{"menuId":"001-05-03","parentMenuId":"001-05","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"记账凭证查询","menuDesc":null,"menuUrl":"cas/casJnlQry/casAccVoucherInf","menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170531141924","updObjName":null,"updTim":null,"children":null},{"menuId":"001-05-04","parentMenuId":"001-05","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"会计分录流水查询","menuDesc":null,"menuUrl":"cas/casJnlQry/casAccEntryJnl","menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170531141941","updObjName":null,"updTim":null,"children":null}]},{"menuId":"001-06","parentMenuId":"001","menuLevel":null,"sysId":"001","menuType":null,"isLeaf":"1","menuName":"账务处理","menuDesc":null,"menuUrl":"#","menuStatus":"1","menuIcon":"bank","creObjName":"gy","creTim":"20170511115106","updObjName":null,"updTim":null,"children":[{"menuId":"001-06-01","parentMenuId":"001-06","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账务调账","menuDesc":null,"menuUrl":"cas/accTreatment/accountAdjustmentManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170525185520","updObjName":"yangxm","updTim":"20170527175127","children":null},{"menuId":"001-06-02","parentMenuId":"001-06","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户充值","menuDesc":null,"menuUrl":"cas/accTreatment/accountRechargeManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170525185546","updObjName":"yangxm","updTim":"20170527175139","children":null}]},{"menuId":"001-07","parentMenuId":"001","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"开户管理","menuDesc":null,"menuUrl":null,"menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170522090322","updObjName":null,"updTim":null,"children":[{"menuId":"001-07-01","parentMenuId":"001-07","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"开户场景管理","menuDesc":null,"menuUrl":"cas/openAccManage/openAccSceneManage","menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170524110603","updObjName":null,"updTim":null,"children":null}]},{"menuId":"001-08","parentMenuId":"001","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"任务管理","menuDesc":null,"menuUrl":"#","menuStatus":"1","menuIcon":"hdd","creObjName":"gy","creTim":"20170511141607","updObjName":"gy","updTim":"20170511141954","children":[{"menuId":"001-08-01","parentMenuId":"001-08","menuLevel":"","sysId":"001","menuType":"1","isLeaf":"1","menuName":"科目任务","menuDesc":"","menuUrl":"#","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170517113700","updObjName":"","updTim":"","children":[{"menuId":"001-08-01-01","parentMenuId":"001-08-01","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"业务类别新增","menuDesc":null,"menuUrl":"cas/taskManage/taskBusTypGroupAddManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170515124902","updObjName":"zhang_dd","updTim":"20170517095542","children":null},{"menuId":"001-08-01-02","parentMenuId":"001-08-01","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"业务类别禁用","menuDesc":null,"menuUrl":"cas/taskManage/taskBusTypGroupDelManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170515124920","updObjName":"zhang_dd","updTim":"20170517095609","children":null},{"menuId":"001-08-01-03","parentMenuId":"001-08-01","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"科目代码新增","menuDesc":null,"menuUrl":"cas/taskManage/taskSubCodeAddManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170515124934","updObjName":"zhang_dd","updTim":"20170517095621","children":null},{"menuId":"001-08-01-04","parentMenuId":"001-08-01","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"科目代码禁用","menuDesc":null,"menuUrl":"cas/taskManage/taskSubCodeDelManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170515124948","updObjName":"zhang_dd","updTim":"20170517095632","children":null},{"menuId":"001-08-01-05","parentMenuId":"001-08-01","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"业务类别启用","menuDesc":null,"menuUrl":"cas/taskManage/taskBusTypGroupEnableManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170608171803","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-01-06","parentMenuId":"001-08-01","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"科目代码启用","menuDesc":null,"menuUrl":"cas/taskManage/taskSubCodeEnableManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170608171832","updObjName":null,"updTim":null,"children":null}]},{"menuId":"001-08-02","parentMenuId":"001-08","menuLevel":"","sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户任务","menuDesc":"","menuUrl":"#","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170517113700","updObjName":"","updTim":"","children":[{"menuId":"001-08-02-01","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"子账户类别新增","menuDesc":null,"menuUrl":"cas/taskManage/taskSubAccCategoryAddManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170515125007","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-02","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"子账户类别删除","menuDesc":null,"menuUrl":"cas/taskManage/taskSubAccCategoryDelManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170517113403","updObjName":"yangxm","updTim":"20170517165027","children":null},{"menuId":"001-08-02-03","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户开户","menuDesc":null,"menuUrl":"cas/taskManage/taskAccProfilesAddManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170515125034","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-04","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户销户","menuDesc":null,"menuUrl":"cas/taskManage/taskAccProfilesDeleteManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170517113547","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-05","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"开户场景新增","menuDesc":null,"menuUrl":"cas/taskManage/taskOpenAccSceneAddManage","menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170524105328","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-06","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"开户场景删除","menuDesc":null,"menuUrl":"cas/taskManage/taskOpenAccSceneDelManage","menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170524105401","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-07","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"开户场景修改","menuDesc":null,"menuUrl":"cas/taskManage/taskOpenAccSceneUpdManage","menuStatus":"1","menuIcon":"user","creObjName":"zhang_dd","creTim":"20170524105440","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-08","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"记账方式删除","menuDesc":null,"menuUrl":"cas/taskManage/taskAccModeInfDeleteManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170524134708","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-09","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户记账管理新增","menuDesc":null,"menuUrl":"cas/taskManage/taskAccManageInfAddManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170524134800","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-10","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户解冻","menuDesc":null,"menuUrl":"cas/taskManage/taskAccProfilesUnfreezeManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170524170433","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-11","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账户充值","menuDesc":null,"menuUrl":"cas/taskManage/taskAccProfilesRechargeManage","menuStatus":"0","menuIcon":"user","creObjName":"yangxm","creTim":"20170527175321","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-02-12","parentMenuId":"001-08-02","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"账务调账","menuDesc":null,"menuUrl":"cas/taskManage/taskAccProfilesAdjustmentManage","menuStatus":"0","menuIcon":"user","creObjName":"yangxm","creTim":"20170527175354","updObjName":null,"updTim":null,"children":null}]},{"menuId":"001-08-03","parentMenuId":"001-08","menuLevel":"","sysId":"001","menuType":"1","isLeaf":"1","menuName":"交易任务","menuDesc":"","menuUrl":"#","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170517113700","updObjName":"","updTim":"","children":[{"menuId":"001-08-03-01","parentMenuId":"001-08-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"分录规则新增","menuDesc":null,"menuUrl":"cas/taskManage/taskAccEntryRulesInfAddManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170517113612","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-03-02","parentMenuId":"001-08-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"分录规则修改","menuDesc":null,"menuUrl":"cas/taskManage/taskAccEntryRulesInfUpdateManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170517113638","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-03-03","parentMenuId":"001-08-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"分录规则删除","menuDesc":null,"menuUrl":"cas/taskManage/taskAccEntryRulesInfDeleteManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170517113700","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-03-04","parentMenuId":"001-08-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"基础交易新增","menuDesc":null,"menuUrl":"cas/taskManage/taskTxnCodeAddManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170520135234","updObjName":"yangxm","updTim":"20170520135846","children":null},{"menuId":"001-08-03-05","parentMenuId":"001-08-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"基础交易删除","menuDesc":null,"menuUrl":"cas/taskManage/taskTxnCodeDeleteManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170520135912","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-03-06","parentMenuId":"001-08-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"交易子码新增","menuDesc":null,"menuUrl":"cas/taskManage/taskTxnSubCodeAddManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170520135938","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-03-07","parentMenuId":"001-08-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"交易子码删除","menuDesc":null,"menuUrl":"cas/taskManage/taskTxnSubCodeDeleteManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170520140001","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-03-08","parentMenuId":"001-08-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"匹配会计分录","menuDesc":null,"menuUrl":"cas/taskManage/taskTxnSubCodeEntryIdManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170524184759","updObjName":null,"updTim":null,"children":null},{"menuId":"001-08-03-09","parentMenuId":"001-08-03","menuLevel":null,"sysId":"001","menuType":"1","isLeaf":"1","menuName":"匹配外部交易码","menuDesc":null,"menuUrl":"cas/taskManage/taskTxnSubCodeExtCodManage","menuStatus":"1","menuIcon":"user","creObjName":"yangxm","creTim":"20170524184821","updObjName":null,"updTim":null,"children":null}]}]}]}]},"roleName":"账务系统超级管理员","roleId":"casSuperAdministrator0"};
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspData: list,
    });
    res.json(data);
  },
  'PUT /rest/agtp/agtp/assignRoleMenu/casSuperAdministrator0'(req, res) {
    // 获取请求参数
    console.log('++++++++++++++++++++assignRoleMenu++++++++++++++++++++++++++++++++');
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '查询成功',
      rspData: {},
    });
    res.json(data);
  },
};

