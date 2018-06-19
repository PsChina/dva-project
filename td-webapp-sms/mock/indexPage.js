const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}


module.exports = {
  'GET /rest/bas/querySysMenu'(req, res) {
    const smsMenu = [
      {
        key: '301-01',
        icon: 'pay-circle-o',
        text: '对账管理',
        children: [
          { key: '301-01-01', text: '核心对账结果1', to: '#' },
          { key: '301-01-02', text: '渠道对账结果2', to: 'sms/chkManage/chnChkSum' },
          { key: '301-01-03', text: '渠道疑账管理3', to: 'sms/chkManage/chnChkDoubtManage' },
          { key: '302-01-04', text: '渠道错账管理4', to: '#' },
          { key: '302-01-05', text: '渠道错账审核5', to: 'sms/chkManage/chnChkErrorAudit' },
        ],
      },
      {
        key: '301-02',
        icon: 'calculator',
        text: '清算管理',
        children: [
          { key: '301-02-01', text: '节假日管理', to: '#' },
          { key: '301-02-02', text: '清分汇总查询', to: 'sms/clrManage/clearingSumManage' },
          // { key: '301-02-03', text: '清分业务汇总查询', to: 'sms/clr/clearingBusinessManage' },
          { key: '301-02-06', text: '分润管理', to: 'sms/stlShrManage/stlShrManage' },
          { key: '301-02-07', text: '分润审核', to: 'sms/stlShrManage/stlShrVerifyManage' },
        ],
      },
    ];

    const menus = [].concat(smsMenu);
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
