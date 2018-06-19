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

  'GET /rest/agtp/user/login'(req, res) {
    const param = qs.parse(Base64.atob(req.query.p));
    console.log('request param =>', param);
    const pwd = param.usrPsw;
    const data = {
    };
    // password 111111
    if (pwd === '96e79218965eb72c92a549dd5a330112') {
      const token = genToken();
      console.log('token =>', token);
      data.rspCod = '200';
      data.rspMsg = '登录成功';
      data.rspData = { token: '11111' };
    }
    const result = mockjs.mock(data);
    res.json(result);
  },
}
