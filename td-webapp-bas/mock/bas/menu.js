const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

module.exports = {
  'GET /rest/bas/menus'(req, res) {
    // 获取请求参数
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const currentPage = param.currentPage;
    const total = 22;
    const pmsMenu1 = [{
      menuId: '000-01',
      icon: 'setting',
      menuName: '系统管理',
      menuStatus: '1',
      menuDesc: '权限系统菜单',
      creObjName: 'jewel',
      creTim: '2017-03-31 12:00:00',
      sysId: '011',
      children: [
        { menuId: '000-01-01', menuName: '用户管理', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: 'bas/sysManage/userManage' },
        { menuId: '000-01-02', menuName: '角色管理', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: 'bas/sysManage/roleManage' },
        { menuId: '000-01-03', menuName: '菜单管理', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: 'bas/sysManage/menuManage' },
        { menuId: '000-01-04', menuName: '机构管理', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: '#' },
        { menuId: '000-01-05', menuName: '密码修改', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: '#' },
      ],
    }]
    const pmsMenu2 = [{
      menuId: '000-02',
      icon: 'schedule',
      menuName: '日志管理',
      menuStatus: '0',
      menuDesc: '权限系统菜单',
      creObjName: 'jewel',
      creTim: '2017-03-31 12:00:00',
      sysId: '011',
      children: [
        { menuId: '000-02-01', menuName: '日志管理', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', menuStatus: '0', menuUrl: '#' },
      ],
    }]
    const pmsMenu3 = [{
      menuId: '000-03',
      icon: 'solution',
      menuName: '服务中心(dubbo)',
      menuStatus: '1',
      menuDesc: '权限系统菜单',
      creObjName: 'jewel',
      creTim: '2017-03-31 12:00:00',
      sysId: '011',
      children: [
        { menuId: '000-03-01', menuName: '调度管理', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: '#' },
        { menuId: '000-03-02', menuName: '调度日志', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: '#' },
      ],
    }]
    const pmsMenu4 = [{
      menuId: '000-04',
      icon: 'solution',
      menuName: '调度中心(xxl-job)',
      menuStatus: '1',
      menuDesc: '权限系统菜单',
      creObjName: 'jewel',
      creTim: '2017-03-31 12:00:00',
      sysId: '011',
      children: [
        { menuId: '000-04-01', menuName: '调度管理', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: '#' },
        { menuId: '000-04-02', menuName: '调度日志', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: '#' },
      ],
    }]
    const pmsMenu5 = [{
      menuId: '000-05',
      icon: 'solution',
      menuName: '任务中心(workflow)',
      menuStatus: '1',
      menuDesc: '权限系统菜单',
      creObjName: 'jewel',
      creTim: '2017-03-31 12:00:00',
      sysId: '011',
      children: [
        { menuId: '000-05-01', menuName: '调度管理', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: '#' },
        { menuId: '000-05-02', menuName: '调度日志', creObjName: 'jewel', creTim: '2017-03-31 12:00:00', menuDesc: '权限系统菜单', sysId: '011', menuStatus: '1', menuUrl: '#' },
      ],
    }]
    const list = [].concat(pmsMenu1, pmsMenu2, pmsMenu3, pmsMenu4, pmsMenu5)
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: 'success',
      total: total,
      rspList: list,
    });
    res.json(data);
  },
  'POST /rest/bas/menu'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '添加成功',
    });
    res.json(data);
  },

  'DELETE /rest/bas/menus'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '删除成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/menus/status'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

  'PUT /rest/bas/menu'(req, res) {
    // 获取请求参数
    console.log('request param =>', Base64.atob(req.body));
    const data = mockjs.mock({
      rspCod: '200',
      rspMsg: '修改成功',
    });
    res.json(data);
  },

};
