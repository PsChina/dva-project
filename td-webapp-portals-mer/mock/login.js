const mockjs = require('mockjs');

const genToken = () => {
  let num = '';
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

module.exports = {
  'GET /rest/merp/user/login'(req, res) {
    console.log('request param =>', req.query.usrPsw);
    const pwd = req.query.usrPsw;
    const data = {
      rspCod: '200',
      rspMsg: '登录成功',
    };
    // password 111111
    //if (pwd === '96e79218965eb72c92a549dd5a330112') {
    const token = genToken();
    data.rspCod = '200';
    data.rspMsg = '登录成功';
    data.rspData = { token: token };
    //}
    const result = mockjs.mock(data);
    res.json(result);
  },

  'GET /rest/merp/user/logout'(req, res) {
    const data = {};
    data.rspCod = '200';
    data.rspMsg = '登录成功';
    const result = mockjs.mock(data);
    res.json(result);
  },

  'POST /rest/merp/vcode/send'(req, res) {
    const data = {};
    data.rspCod = '200';
    data.rspMsg = '发送成功';
    const result = mockjs.mock(data);
    res.json(result);
  },

  'GET /rest/merp/vcode/valid'(req, res) {
    const data = {};
    data.rspCod = '200';
    data.rspMsg = '校验成功';
    const result = mockjs.mock(data);
    res.json(result);
  },

  'PUT /rest/merp/user/password'(req, res) {
    const data = {};
    data.rspCod = '200';
    data.rspMsg = '修改成功';
    const result = mockjs.mock(data);
    res.json(result);
  },
}
