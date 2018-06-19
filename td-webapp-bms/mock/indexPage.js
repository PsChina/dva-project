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
    const bmsMenus = [{
      key: '200',
      icon: 'trademark',
      text: '业务管理',
      children: [
        { key: '200-01', text: '业务总览', to: 'bms/businessManage/businessOverview' },
        { key: '200-02', text: '个人业务管理', to: 'bms/businessManage/personalMemberBusinessManage' },
        { key: '200-03', text: '商户业务管理', to: 'bms/businessManage/merchantBusinessManage' },
        // { key: '200-04', text: '门店业务管理', to: 'bms/businessManage/merchantStoreBusinessManage' },
        { key: '200-05', text: '终端业务管理', to: 'bms/businessManage/terminalBusinessManage' },
        { key: '200-06', text: '代理商业务管理', to: 'bms/businessManage/agentBusinessManage' },
        // { key: '200-07', text: '服务商业务管理', to: 'bms/businessManage/providerBusinessManage' },
      ],
    }];
    // build menus like [].concat(mmsMenus, tmsMenus)
    const menus = [].concat(bmsMenus);
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
