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
    const tmsMenu = [
      {
        key: '102-01',
        icon: 'team',
        text: '终端数据管理',
        children: [
          { key: '102-01-11', text: '终端厂商管理', to: 'tms/terminalManage/terminalCompanyManage' },
          { key: '102-01-12', text: '终端型号管理', to: 'tms/terminalManage/terminalModelManage' },
          { key: '102-01-13', text: '终端密钥管理', to: 'tms/terminalManage/terminalKeyManage' },
          { key: '102-01-14', text: '终端固件管理', to: 'tms/terminalManage/terminalFirmwareManage' },
          { key: '102-01-15', text: '终端应用管理', to: 'tms/terminalManage/terminalAppManage' },
          { key: '102-01-16', text: '终端参数管理', to: 'tms/terminalManage/terminalParamManage' },
          { key: '102-01-17', text: '交易权限管理', to: 'tms/terminalManage/terminalTxnAuthManage' },
        ],
      },
      {
        key: '102-02',
        icon: 'solution',
        text: '终端信息管理',
        children: [
          { key: '102-02-21', text: '终端入库', to: 'tms/terminalInfoManage/terminalStockAdd' },
          { key: '102-02-22', text: '终端库存管理', to: 'tms/terminalInfoManage/terminalStockManage' },
          { key: '102-02-23', text: '终端信息管理', to: 'tms/terminalInfoManage/terminalManage' },
          { key: '102-02-24', text: '终端日志管理', to: 'tms/terminalInfoManage/terminalLogManage' },
        ],
      },
      {
        key: '102-03',
        icon: 'user',
        text: '终端会员管理',
        children: [
          { key: '102-03-31', text: '终端代理商管理', to: 'tms/terminalBindManage/terminalAgentManage' },
          { key: '102-03-32', text: '终端商户管理', to: 'tms/terminalBindManage/terminalMerManage' },
        ],
      },
      {
        key: '102-04',
        icon: 'user',
        text: '二维码管理',
        children: [
          { key: '102-04-41', text: '二维码信息管理', to: 'tms/qrCodeManage/qrCodeInfoManage' },
        ],
      },
    ];

    const menus = [].concat(tmsMenu);
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
