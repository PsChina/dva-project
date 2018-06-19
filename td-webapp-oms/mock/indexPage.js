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
    const omsMenu = [
      {
        key: '105-01',
        icon: 'user',
        text: '交易汇总查询',
        children: [
          { key: '105-01-11', text: '当日汇总交易', to: 'oms/orderManage/summaryOrderManage' },
          { key: '105-01-12', text: '历史汇总交易', to: 'oms/orderManage/summaryHisOrderManage' },
        ],
      },
      {
        key: '105-02',
        icon: 'user',
        text: '银行卡交易查询',
        children: [
          { key: '105-02-21', text: '当日银行卡交易', to: 'oms/orderManage/bankcardOrderManage' },
          { key: '105-02-22', text: '历史银行卡交易', to: 'oms/orderManage/bankcardHisOrderManage' },
        ],
      },
      {
        key: '105-03',
        icon: 'user',
        text: '扫码交易查询',
        children: [
          { key: '105-03-31', text: '当日扫码交易', to: 'oms/orderManage/scanOrderManage' },
          { key: '105-03-32', text: '历史扫码交易', to: 'oms/orderManage/scanHisOrderManage' },
        ],
      },
      {
        key: '105-04',
        icon: 'user',
        text: '调单处理查询',
        children: [
          { key: '105-04-41', text: '调单处理查询', to: 'oms/orderManage/orderTransRecManage' },
        ],
      },
    ];


    const menus = [].concat(omsMenu);
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
