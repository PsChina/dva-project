const mockjs = require('mockjs');
const qs = require('qs');
const Base64 = require('Base64');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

module.exports = {
  'GET /rest/bas/user/login'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const usr = param.usrName;
    const pwd = param.usrPsw;
    const data = {
      rspCod: '300',
      rspMsg: '用户名或密码错误',
    };
    // password 111111
    if (usr === 'admin' && pwd === '96e79218965eb72c92a549dd5a330112') {
      const token = genToken();
      console.log('token =>', token);
      data.rspCod = '200';
      data.rspMsg = '登录成功';
      data.rspData = { token: token };
    }
    const result = mockjs.mock(data);
    res.json(result);
  },
};
