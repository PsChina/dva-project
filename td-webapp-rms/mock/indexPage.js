const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}


module.exports = {
  'GET /auth/mock/getMenuBySys.do'(req, res) {
    const basMenu = [
      {
        key: '000-01',
        icon: 'setting',
        text: '系统管理',
        children: [
          { key: '000-01-01', text: '规则管理', to: 'rms/ruleManage' },
          { key: '000-01-02', text: '角色管理', to: 'bas/sysManage/roleManage' },
          { key: '000-01-03', text: '菜单管理', to: 'bas/sysManage/menuManage' },
          { key: '000-01-04', text: '机构管理', to: 'bas/sysManage/orgManage' },
          { key: '000-01-05', text: '密码修改', to: 'bas/sysManage/passwordUpdate' },
          { key: '000-01-06', text: '预警组管理', to: 'warnGroup/manage' },
          { key: '000-01-07', text: '预警人员管理', to: 'warnUser/manage' },
        ],
      },
      {
        key: '000-02',
        icon: 'solution',
        text: '日志管理',
        children: [
          { key: '000-02-01', text: '日志管理', to: 'bas/logManage/logManage' },
        ],
      },
      {
        key: '000-03',
        icon: 'user',
        text: '服务中心(dubbo)',
        children: [
          { key: '000-03-01', text: '服务', to: 'bas/dubbo/services' },
          { key: '000-03-02', text: '应用', to: 'bas/dubbo/applications' },
          { key: '000-03-03', text: '机器', to: 'bas/dubbo/addresses' },
          { key: '000-03-04', text: '提供者', to: 'bas/dubbo/providers' },
          { key: '000-03-05', text: '消费者', to: 'bas/dubbo/consumers' },
          { key: '000-03-06', text: '负载均衡', to: 'bas/dubbo/dubbo/loadbalances' },
        ],
      },
      {
        key: '000-04',
        icon: 'user',
        text: '调度中心(xxl-job)',
        children: [
          { key: '000-04-01', text: '调度管理', to: 'bas/jobTirgger/jobTriggerInfoManage' },
          { key: '000-04-02', text: '调度日志', to: 'bas/jobTirgger/jobTriggerLogManage' },
        ],
      },
      {
        key: '000-05',
        icon: 'user',
        text: '任务中心(workflow)',
        children: [
          { key: '000-05-01', text: '调度管理', to: '#' },
        { key: '000-05-02', text: '调度日志', to: '#' },
        ],
      },
    ];

    const menus = [].concat(basMenu);
    const data = mockjs.mock({
      rspCod: '000000',
      rspMsg: 'success',
      rspData: {
        usrLoginAuthList: menus,
      },
    });
    res.json(data);
  },

  'GET /auth/mock/login.do'(req, res) {
    console.log('request param =>', req.query.usrPsw);
    const pwd = req.query.usrPsw;
    const data = {
      rspCod: '300',
      rspMsg: '密码错误',
    };
    // password 111111
    if (pwd === '96e79218965eb72c92a549dd5a330112') {
      const token = genToken();
      console.log('token =>', token);
      data.rspCod = '000000';
      data.rspMsg = '登录成功';
      data.rspData = { token: token };
    }
    const result = mockjs.mock(data);
    res.json(result);
  },
}
