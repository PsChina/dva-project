const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}


module.exports = {
  'GET /rest/bas/user/menus'(req, res) {
    const basMenu = [
      {
        key: '000-01',
        icon: 'setting',
        text: '系统管理',
        children: [
          { key: '000-01-01', text: '用户管理', to: 'bas/sysManage/userManage' },
          { key: '000-01-02', text: '角色管理', to: 'bas/sysManage/roleManage' },
          { key: '000-01-03', text: '菜单管理', to: 'bas/sysManage/menuManage' },
          { key: '000-01-04', text: '机构管理', to: 'bas/sysManage/orgManage' },
          { key: '000-01-05', text: '密码修改', to: 'bas/sysManage/passwordUpdate' },
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
        key: '000-04',
        icon: 'user',
        text: '任务配置',
        children: [
          { key: '000-04-01', text: '工作流维护', to: 'bas/workflow/modelMainManage' },
          { key: '000-04-02', text: '岗位维护', to: 'bas/workflow/positionManage' },
          { key: '000-04-03', text: '步骤维护', to: 'bas/workflow/procedureManage' },
          { key: '000-04-04', text: '任务监控', to: 'bas/workflow/taskMonitorManage' },
        ],
      },
      {
        key: '000-05',
        icon: 'user',
        text: '基础数据',
        children: [
          { key: '000-05-01', text: '节假日维护', to: 'bas/basDataManage/holidayManage' },
          { key: '000-05-02', text: '银行信息管理', to: 'bas/basDataManage/pubBankManage' },
          { key: '000-05-03', text: '卡bin信息管理', to: 'bas/basDataManage/pubUnionfitManage' },
          { key: '000-05-04', text: '地区信息管理', to: 'bas/basDataManage/pubAreaManage' },
          { key: '000-05-05', text: 'MCC信息管理', to: 'bas/basDataManage/pubMccManage' },
          { key: '000-05-06', text: '国家信息管理', to: 'bas/basDataManage/pubCountryManage' },
          { key: '000-05-07', text: '币种信息管理', to: 'bas/basDataManage/pubCurrencyManage' },
          { key: '000-05-08', text: '汇率维护', to: 'bas/basDataManage/pubExchangeRateManage' },
        ],
      },
      {
        key: '000-06',
        icon: 'user',
        text: '消息管理',
        children: [
          { key: '000-06-01', text: '公告管理', to: 'bas/messageManage/pubAnnmentManage' },
          { key: '000-06-02', text: '消息管理', to: 'bas/messageManage/pubMessageManage' },
        ],
      },
    ];

    const menus = [].concat(basMenu);
    const data = mockjs.mock({
      rspCod: '200',
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
